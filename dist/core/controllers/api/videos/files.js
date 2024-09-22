import express from 'express';
import validator from 'validator';
import { logger, loggerTagsFactory } from '../../../helpers/logger.js';
import { federateVideoIfNeeded } from '../../../lib/activitypub/videos/index.js';
import { updateM3U8AndShaPlaylist } from '../../../lib/hls.js';
import { removeAllWebVideoFiles, removeHLSFile, removeHLSPlaylist, removeWebVideoFile } from '../../../lib/video-file.js';
import { VideoFileModel } from '../../../models/video/video-file.js';
import { HttpStatusCode, UserRight } from '@peertube/peertube-models';
import { asyncMiddleware, authenticate, ensureUserHasRight, videoFileMetadataGetValidator, videoFilesDeleteHLSFileValidator, videoFilesDeleteHLSValidator, videoFilesDeleteWebVideoFileValidator, videoFilesDeleteWebVideoValidator, videosGetValidator } from '../../../middlewares/index.js';
const lTags = loggerTagsFactory('api', 'video');
const filesRouter = express.Router();
filesRouter.get('/:id/metadata/:videoFileId', asyncMiddleware(videosGetValidator), asyncMiddleware(videoFileMetadataGetValidator), asyncMiddleware(getVideoFileMetadata));
filesRouter.delete('/:id/hls', authenticate, ensureUserHasRight(UserRight.MANAGE_VIDEO_FILES), asyncMiddleware(videoFilesDeleteHLSValidator), asyncMiddleware(removeHLSPlaylistController));
filesRouter.delete('/:id/hls/:videoFileId', authenticate, ensureUserHasRight(UserRight.MANAGE_VIDEO_FILES), asyncMiddleware(videoFilesDeleteHLSFileValidator), asyncMiddleware(removeHLSFileController));
filesRouter.delete(['/:id/webtorrent', '/:id/web-videos'], authenticate, ensureUserHasRight(UserRight.MANAGE_VIDEO_FILES), asyncMiddleware(videoFilesDeleteWebVideoValidator), asyncMiddleware(removeAllWebVideoFilesController));
filesRouter.delete(['/:id/webtorrent/:videoFileId', '/:id/web-videos/:videoFileId'], authenticate, ensureUserHasRight(UserRight.MANAGE_VIDEO_FILES), asyncMiddleware(videoFilesDeleteWebVideoFileValidator), asyncMiddleware(removeWebVideoFileController));
export { filesRouter };
async function getVideoFileMetadata(req, res) {
    const videoFile = await VideoFileModel.loadWithMetadata(validator.default.toInt(req.params.videoFileId));
    return res.json(videoFile.metadata);
}
async function removeHLSPlaylistController(req, res) {
    const video = res.locals.videoAll;
    logger.info('Deleting HLS playlist of %s.', video.url, lTags(video.uuid));
    await removeHLSPlaylist(video);
    await federateVideoIfNeeded(video, false, undefined);
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function removeHLSFileController(req, res) {
    const video = res.locals.videoAll;
    const videoFileId = +req.params.videoFileId;
    logger.info('Deleting HLS file %d of %s.', videoFileId, video.url, lTags(video.uuid));
    const playlist = await removeHLSFile(video, videoFileId);
    if (playlist)
        await updateM3U8AndShaPlaylist(video, playlist);
    await federateVideoIfNeeded(video, false, undefined);
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function removeAllWebVideoFilesController(req, res) {
    const video = res.locals.videoAll;
    logger.info('Deleting Web Video files of %s.', video.url, lTags(video.uuid));
    await removeAllWebVideoFiles(video);
    await federateVideoIfNeeded(video, false, undefined);
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function removeWebVideoFileController(req, res) {
    const video = res.locals.videoAll;
    const videoFileId = +req.params.videoFileId;
    logger.info('Deleting Web Video file %d of %s.', videoFileId, video.url, lTags(video.uuid));
    await removeWebVideoFile(video, videoFileId);
    await federateVideoIfNeeded(video, false, undefined);
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
//# sourceMappingURL=files.js.map