import { logger, loggerTagsFactory } from '../../../../helpers/logger.js';
import { VideoPathManager } from '../../../video-path-manager.js';
import { VideoJobInfoModel } from '../../../../models/video/video-job-info.js';
import { VideoSourceModel } from '../../../../models/video/video-source.js';
import { VideoModel } from '../../../../models/video/video.js';
export async function moveToJob(options) {
    const { jobId, loggerTags, videoUUID, moveVideoSourceFile, moveHLSFiles, moveWebVideoFiles, moveToFailedState, doAfterLastMove } = options;
    const lTagsBase = loggerTagsFactory(...loggerTags);
    const fileMutexReleaser = await VideoPathManager.Instance.lockFiles(videoUUID);
    const video = await VideoModel.loadWithFiles(videoUUID);
    if (!video) {
        logger.info('Can\'t process job %d, video does not exist.', jobId, lTagsBase(videoUUID));
        fileMutexReleaser();
        return undefined;
    }
    const lTags = lTagsBase(video.uuid, video.url);
    try {
        const source = await VideoSourceModel.loadLatest(video.id);
        if (source === null || source === void 0 ? void 0 : source.keptOriginalFilename) {
            logger.debug(`Moving video source ${source.keptOriginalFilename} file of video ${video.uuid}`, lTags);
            await moveVideoSourceFile(source);
        }
        if (video.VideoFiles) {
            logger.debug('Moving %d web video files for video %s.', video.VideoFiles.length, video.uuid, lTags);
            await moveWebVideoFiles(video);
        }
        if (video.VideoStreamingPlaylists) {
            logger.debug('Moving HLS playlist of %s.', video.uuid, lTags);
            await moveHLSFiles(video);
        }
        const pendingMove = await VideoJobInfoModel.decrease(video.uuid, 'pendingMove');
        if (pendingMove === 0) {
            logger.info('Running cleanup after moving files (video %s in job %s)', video.uuid, jobId, lTags);
            await doAfterLastMove(video);
        }
    }
    catch (err) {
        await onMoveToStorageFailure({ videoUUID, err, lTags, moveToFailedState });
        throw err;
    }
    finally {
        fileMutexReleaser();
    }
}
export async function onMoveToStorageFailure(options) {
    const { videoUUID, err, lTags, moveToFailedState } = options;
    const video = await VideoModel.loadWithFiles(videoUUID);
    if (!video)
        return;
    logger.error('Cannot move video %s storage.', video.url, Object.assign({ err }, lTags));
    await moveToFailedState(video);
    await VideoJobInfoModel.abortAllTasks(video.uuid, 'pendingMove');
}
//# sourceMappingURL=move-video.js.map