import { logger } from '../../../../helpers/logger.js';
import { onTranscodingEnded } from '../../../transcoding/ended-transcoding.js';
import { onWebVideoFileTranscoding } from '../../../transcoding/web-transcoding.js';
import { VideoModel } from '../../../../models/video/video.js';
export async function onVODWebVideoOrAudioMergeTranscodingJob(options) {
    const { video, videoFilePath, privatePayload, wasAudioFile } = options;
    const deleteWebInputVideoFile = privatePayload.deleteInputFileId
        ? video.VideoFiles.find(f => f.id === privatePayload.deleteInputFileId)
        : undefined;
    await onWebVideoFileTranscoding({ video, videoOutputPath: videoFilePath, deleteWebInputVideoFile, wasAudioFile });
    await onTranscodingEnded({ isNewVideo: privatePayload.isNewVideo, moveVideoToNextState: true, video });
}
export async function loadRunnerVideo(runnerJob, lTags) {
    const videoUUID = runnerJob.privatePayload.videoUUID;
    const video = await VideoModel.loadFull(videoUUID);
    if (!video) {
        logger.info('Video %s does not exist anymore after runner job.', videoUUID, lTags(videoUUID));
        return undefined;
    }
    return video;
}
//# sourceMappingURL=utils.js.map