import { copy } from 'fs-extra/esm';
import { createTorrentAndSetInfoHash } from '../../../helpers/webtorrent.js';
import { CONFIG } from '../../../initializers/config.js';
import { federateVideoIfNeeded } from '../../activitypub/videos/index.js';
import { VideoPathManager } from '../../video-path-manager.js';
import { VideoModel } from '../../../models/video/video.js';
import { getVideoStreamDimensionsInfo } from '@peertube/peertube-ffmpeg';
import { logger } from '../../../helpers/logger.js';
import { JobQueue } from '../job-queue.js';
import { buildMoveJob } from '../../video-jobs.js';
import { buildNewFile } from '../../video-file.js';
async function processVideoFileImport(job) {
    const payload = job.data;
    logger.info('Processing video file import in job %s.', job.id);
    const video = await VideoModel.loadFull(payload.videoUUID);
    if (!video) {
        logger.info('Do not process job %d, video does not exist.', job.id);
        return undefined;
    }
    await updateVideoFile(video, payload.filePath);
    if (CONFIG.OBJECT_STORAGE.ENABLED) {
        await JobQueue.Instance.createJob(await buildMoveJob({ video, previousVideoState: video.state, type: 'move-to-object-storage' }));
    }
    else {
        await federateVideoIfNeeded(video, false);
    }
    return video;
}
export { processVideoFileImport };
async function updateVideoFile(video, inputFilePath) {
    const { resolution } = await getVideoStreamDimensionsInfo(inputFilePath);
    const currentVideoFile = video.VideoFiles.find(videoFile => videoFile.resolution === resolution);
    if (currentVideoFile) {
        await video.removeWebVideoFile(currentVideoFile);
        video.VideoFiles = video.VideoFiles.filter(f => f !== currentVideoFile);
        await currentVideoFile.destroy();
    }
    const newVideoFile = await buildNewFile({ mode: 'web-video', path: inputFilePath });
    newVideoFile.videoId = video.id;
    const outputPath = VideoPathManager.Instance.getFSVideoFileOutputPath(video, newVideoFile);
    await copy(inputFilePath, outputPath);
    video.VideoFiles.push(newVideoFile);
    await createTorrentAndSetInfoHash(video, newVideoFile);
    await newVideoFile.save();
}
//# sourceMappingURL=video-file-import.js.map