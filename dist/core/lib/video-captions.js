import { VideoFileStream } from '@peertube/peertube-models';
import { buildSUUID } from '@peertube/peertube-node-utils';
import { TranscriptionModel, WhisperBuiltinModel, transcriberFactory } from '@peertube/peertube-transcription';
import { moveAndProcessCaptionFile } from '../helpers/captions-utils.js';
import { isVideoCaptionLanguageValid } from '../helpers/custom-validators/video-captions.js';
import { logger, loggerTagsFactory } from '../helpers/logger.js';
import { CONFIG } from '../initializers/config.js';
import { DIRECTORIES } from '../initializers/constants.js';
import { sequelizeTypescript } from '../initializers/database.js';
import { VideoCaptionModel } from '../models/video/video-caption.js';
import { VideoJobInfoModel } from '../models/video/video-job-info.js';
import { VideoModel } from '../models/video/video.js';
import { ensureDir, remove } from 'fs-extra/esm';
import { join } from 'path';
import { federateVideoIfNeeded } from './activitypub/videos/federate.js';
import { JobQueue } from './job-queue/job-queue.js';
import { Notifier } from './notifier/notifier.js';
import { TranscriptionJobHandler } from './runners/index.js';
import { VideoPathManager } from './video-path-manager.js';
import { retryTransactionWrapper } from '../helpers/database-utils.js';
const lTags = loggerTagsFactory('video-caption');
export async function createLocalCaption(options) {
    const { language, path, video, automaticallyGenerated } = options;
    const videoCaption = new VideoCaptionModel({
        videoId: video.id,
        filename: VideoCaptionModel.generateCaptionName(language),
        language,
        automaticallyGenerated
    });
    await moveAndProcessCaptionFile({ path }, videoCaption);
    await retryTransactionWrapper(() => {
        return sequelizeTypescript.transaction(t => {
            return VideoCaptionModel.insertOrReplaceLanguage(videoCaption, t);
        });
    });
    return Object.assign(videoCaption, { Video: video });
}
export async function createTranscriptionTaskIfNeeded(video) {
    if (CONFIG.VIDEO_TRANSCRIPTION.ENABLED !== true)
        return;
    logger.info(`Creating transcription job for ${video.url}`, lTags(video.uuid));
    if (CONFIG.VIDEO_TRANSCRIPTION.REMOTE_RUNNERS.ENABLED === true) {
        await new TranscriptionJobHandler().create({ video });
    }
    else {
        await JobQueue.Instance.createJob({ type: 'video-transcription', payload: { videoUUID: video.uuid } });
    }
    await VideoJobInfoModel.increaseOrCreate(video.uuid, 'pendingTranscription');
}
let transcriber;
export async function generateSubtitle(options) {
    const outputPath = join(CONFIG.STORAGE.TMP_DIR, 'transcription', buildSUUID());
    let inputFileMutexReleaser;
    try {
        await ensureDir(outputPath);
        const binDirectory = join(DIRECTORIES.LOCAL_PIP_DIRECTORY, 'bin');
        if (!transcriber) {
            transcriber = transcriberFactory.createFromEngineName({
                engineName: CONFIG.VIDEO_TRANSCRIPTION.ENGINE,
                enginePath: CONFIG.VIDEO_TRANSCRIPTION.ENGINE_PATH,
                logger,
                binDirectory
            });
            if (!CONFIG.VIDEO_TRANSCRIPTION.ENGINE_PATH) {
                logger.info(`Installing transcriber ${transcriber.engine.name} to generate subtitles`, lTags());
                await transcriber.install(DIRECTORIES.LOCAL_PIP_DIRECTORY);
            }
        }
        inputFileMutexReleaser = await VideoPathManager.Instance.lockFiles(options.video.uuid);
        const video = await VideoModel.loadFull(options.video.uuid);
        if (!video) {
            logger.info('Do not process transcription, video does not exist anymore.', lTags(options.video.uuid));
            return undefined;
        }
        const file = video.getMaxQualityFile(VideoFileStream.AUDIO);
        if (!file) {
            logger.info(`Do not run transcription for ${video.uuid} in ${outputPath} because it does not contain an audio stream`, Object.assign({ video }, lTags(video.uuid)));
            return;
        }
        await VideoPathManager.Instance.makeAvailableVideoFile(file, async (inputPath) => {
            setTimeout(() => inputFileMutexReleaser(), 1000);
            logger.info(`Running transcription for ${video.uuid} in ${outputPath}`, lTags(video.uuid));
            const transcriptFile = await transcriber.transcribe({
                mediaFilePath: inputPath,
                model: CONFIG.VIDEO_TRANSCRIPTION.MODEL_PATH
                    ? await TranscriptionModel.fromPath(CONFIG.VIDEO_TRANSCRIPTION.MODEL_PATH)
                    : new WhisperBuiltinModel(CONFIG.VIDEO_TRANSCRIPTION.MODEL),
                transcriptDirectory: outputPath,
                format: 'vtt'
            });
            await onTranscriptionEnded({ video, language: transcriptFile.language, vttPath: transcriptFile.path });
        });
    }
    finally {
        if (outputPath)
            await remove(outputPath);
        if (inputFileMutexReleaser)
            inputFileMutexReleaser();
        VideoJobInfoModel.decrease(options.video.uuid, 'pendingTranscription')
            .catch(err => logger.error('Cannot decrease pendingTranscription job count', Object.assign({ err }, lTags(options.video.uuid))));
    }
}
export async function onTranscriptionEnded(options) {
    const { video, language, vttPath, lTags: customLTags = [] } = options;
    if (!isVideoCaptionLanguageValid(language)) {
        logger.warn(`Invalid transcription language for video ${video.uuid}`, lTags(video.uuid));
        return;
    }
    if (!video.language) {
        video.language = language;
        await video.save();
    }
    const existing = await VideoCaptionModel.loadByVideoIdAndLanguage(video.id, language);
    if (existing && !existing.automaticallyGenerated) {
        logger.info(`Do not replace existing caption for video ${video.uuid} after transcription (subtitle may have been added while during the transcription process)`, lTags(video.uuid));
        return;
    }
    const caption = await createLocalCaption({
        video,
        language,
        path: vttPath,
        automaticallyGenerated: true
    });
    await sequelizeTypescript.transaction(async (t) => {
        await federateVideoIfNeeded(video, false, t);
    });
    Notifier.Instance.notifyOfGeneratedVideoTranscription(caption);
    logger.info(`Transcription ended for ${video.uuid}`, lTags(video.uuid, ...customLTags));
}
//# sourceMappingURL=video-captions.js.map