import { forceNumber } from '@peertube/peertube-core-utils';
import { HttpStatusCode, ThumbnailType, VideoCommentPolicy, VideoPrivacy } from '@peertube/peertube-models';
import { exists } from '../../../helpers/custom-validators/misc.js';
import { changeVideoChannelShare } from '../../../lib/activitypub/share.js';
import { isNewVideoPrivacyForFederation, isPrivacyForFederation } from '../../../lib/activitypub/videos/federate.js';
import { AutomaticTagger } from '../../../lib/automatic-tags/automatic-tagger.js';
import { setAndSaveVideoAutomaticTags } from '../../../lib/automatic-tags/automatic-tags.js';
import { updateLocalVideoMiniatureFromExisting } from '../../../lib/thumbnail.js';
import { replaceChaptersFromDescriptionIfNeeded } from '../../../lib/video-chapters.js';
import { addVideoJobsAfterUpdate } from '../../../lib/video-jobs.js';
import { VideoPathManager } from '../../../lib/video-path-manager.js';
import { setVideoPrivacy } from '../../../lib/video-privacy.js';
import { setVideoTags } from '../../../lib/video.js';
import { openapiOperationDoc } from '../../../middlewares/doc.js';
import { VideoPasswordModel } from '../../../models/video/video-password.js';
import express from 'express';
import { VideoAuditView, auditLoggerFactory, getAuditIdFromRes } from '../../../helpers/audit-logger.js';
import { resetSequelizeInstance } from '../../../helpers/database-utils.js';
import { createReqFiles } from '../../../helpers/express-utils.js';
import { logger, loggerTagsFactory } from '../../../helpers/logger.js';
import { MIMETYPES } from '../../../initializers/constants.js';
import { sequelizeTypescript } from '../../../initializers/database.js';
import { Hooks } from '../../../lib/plugins/hooks.js';
import { autoBlacklistVideoIfNeeded } from '../../../lib/video-blacklist.js';
import { asyncMiddleware, asyncRetryTransactionMiddleware, authenticate, videosUpdateValidator } from '../../../middlewares/index.js';
import { ScheduleVideoUpdateModel } from '../../../models/video/schedule-video-update.js';
import { VideoModel } from '../../../models/video/video.js';
const lTags = loggerTagsFactory('api', 'video');
const auditLogger = auditLoggerFactory('videos');
const updateRouter = express.Router();
const reqVideoFileUpdate = createReqFiles(['thumbnailfile', 'previewfile'], MIMETYPES.IMAGE.MIMETYPE_EXT);
updateRouter.put('/:id', openapiOperationDoc({ operationId: 'putVideo' }), authenticate, reqVideoFileUpdate, asyncMiddleware(videosUpdateValidator), asyncRetryTransactionMiddleware(updateVideo));
export { updateRouter };
async function updateVideo(req, res) {
    const videoFromReq = res.locals.videoAll;
    const oldVideoAuditView = new VideoAuditView(videoFromReq.toFormattedDetailsJSON());
    const videoInfoToUpdate = req.body;
    const hadPrivacyForFederation = isPrivacyForFederation(videoFromReq.privacy);
    const oldPrivacy = videoFromReq.privacy;
    const thumbnails = await buildVideoThumbnailsFromReq(videoFromReq, req.files);
    const videoFileLockReleaser = await VideoPathManager.Instance.lockFiles(videoFromReq.uuid);
    try {
        const { videoInstanceUpdated, isNewVideoForFederation } = await sequelizeTypescript.transaction(async (t) => {
            const video = await VideoModel.loadFull(videoFromReq.id, t);
            const oldName = video.name;
            const oldDescription = video.description;
            const oldVideoChannel = video.VideoChannel;
            const keysToUpdate = [
                'name',
                'category',
                'licence',
                'language',
                'nsfw',
                'waitTranscoding',
                'support',
                'description',
                'downloadEnabled'
            ];
            for (const key of keysToUpdate) {
                if (videoInfoToUpdate[key] !== undefined)
                    video.set(key, videoInfoToUpdate[key]);
            }
            if (videoInfoToUpdate.commentsPolicy !== undefined) {
                video.commentsPolicy = videoInfoToUpdate.commentsPolicy;
            }
            else if (videoInfoToUpdate.commentsEnabled === true) {
                video.commentsPolicy = VideoCommentPolicy.ENABLED;
            }
            else if (videoInfoToUpdate.commentsEnabled === false) {
                video.commentsPolicy = VideoCommentPolicy.DISABLED;
            }
            if (videoInfoToUpdate.originallyPublishedAt !== undefined) {
                video.originallyPublishedAt = videoInfoToUpdate.originallyPublishedAt
                    ? new Date(videoInfoToUpdate.originallyPublishedAt)
                    : null;
            }
            let isNewVideoForFederation = false;
            if (videoInfoToUpdate.privacy !== undefined) {
                isNewVideoForFederation = await updateVideoPrivacy({
                    videoInstance: video,
                    videoInfoToUpdate,
                    hadPrivacyForFederation,
                    transaction: t
                });
            }
            if (!video.changed()) {
                await video.setAsRefreshed(t);
            }
            const videoInstanceUpdated = await video.save({ transaction: t });
            for (const thumbnail of thumbnails) {
                await videoInstanceUpdated.addAndSaveThumbnail(thumbnail, t);
            }
            if (videoInfoToUpdate.tags !== undefined) {
                await setVideoTags({ video: videoInstanceUpdated, tags: videoInfoToUpdate.tags, transaction: t });
            }
            if (res.locals.videoChannel && videoInstanceUpdated.channelId !== res.locals.videoChannel.id) {
                await videoInstanceUpdated.$set('VideoChannel', res.locals.videoChannel, { transaction: t });
                videoInstanceUpdated.VideoChannel = res.locals.videoChannel;
                if (hadPrivacyForFederation === true) {
                    await changeVideoChannelShare(videoInstanceUpdated, oldVideoChannel, t);
                }
            }
            await updateSchedule(videoInstanceUpdated, videoInfoToUpdate, t);
            if (oldDescription !== video.description) {
                await replaceChaptersFromDescriptionIfNeeded({
                    newDescription: videoInstanceUpdated.description,
                    transaction: t,
                    video,
                    oldDescription
                });
            }
            if (oldName !== video.name || oldDescription !== video.description) {
                const automaticTags = await new AutomaticTagger().buildVideoAutomaticTags({ video, transaction: t });
                await setAndSaveVideoAutomaticTags({ video, automaticTags, transaction: t });
            }
            await autoBlacklistVideoIfNeeded({
                video: videoInstanceUpdated,
                user: res.locals.oauth.token.User,
                isRemote: false,
                isNew: false,
                isNewFile: false,
                transaction: t
            });
            auditLogger.update(getAuditIdFromRes(res), new VideoAuditView(videoInstanceUpdated.toFormattedDetailsJSON()), oldVideoAuditView);
            logger.info('Video with name %s and uuid %s updated.', video.name, video.uuid, lTags(video.uuid));
            return { videoInstanceUpdated, isNewVideoForFederation };
        });
        Hooks.runAction('action:api.video.updated', { video: videoInstanceUpdated, body: req.body, req, res });
        await addVideoJobsAfterUpdate({
            video: videoInstanceUpdated,
            nameChanged: !!videoInfoToUpdate.name,
            oldPrivacy,
            isNewVideoForFederation
        });
    }
    catch (err) {
        await resetSequelizeInstance(videoFromReq);
        throw err;
    }
    finally {
        videoFileLockReleaser();
    }
    return res.type('json')
        .status(HttpStatusCode.NO_CONTENT_204)
        .end();
}
async function updateVideoPrivacy(options) {
    const { videoInstance, videoInfoToUpdate, hadPrivacyForFederation, transaction } = options;
    const isNewVideoForFederation = isNewVideoPrivacyForFederation(videoInstance.privacy, videoInfoToUpdate.privacy);
    const newPrivacy = forceNumber(videoInfoToUpdate.privacy);
    setVideoPrivacy(videoInstance, newPrivacy);
    if (videoInstance.privacy === VideoPrivacy.PASSWORD_PROTECTED && newPrivacy !== VideoPrivacy.PASSWORD_PROTECTED) {
        await VideoPasswordModel.deleteAllPasswords(videoInstance.id, transaction);
    }
    if (newPrivacy === VideoPrivacy.PASSWORD_PROTECTED && exists(videoInfoToUpdate.videoPasswords)) {
        await VideoPasswordModel.deleteAllPasswords(videoInstance.id, transaction);
        await VideoPasswordModel.addPasswords(videoInfoToUpdate.videoPasswords, videoInstance.id, transaction);
    }
    if (hadPrivacyForFederation && !isPrivacyForFederation(videoInstance.privacy)) {
        await VideoModel.sendDelete(videoInstance, { transaction });
    }
    return isNewVideoForFederation;
}
function updateSchedule(videoInstance, videoInfoToUpdate, transaction) {
    if (videoInfoToUpdate.scheduleUpdate) {
        return ScheduleVideoUpdateModel.upsert({
            videoId: videoInstance.id,
            updateAt: new Date(videoInfoToUpdate.scheduleUpdate.updateAt),
            privacy: videoInfoToUpdate.scheduleUpdate.privacy || null
        }, { transaction });
    }
    else if (videoInfoToUpdate.scheduleUpdate === null) {
        return ScheduleVideoUpdateModel.deleteByVideoId(videoInstance.id, transaction);
    }
}
async function buildVideoThumbnailsFromReq(video, files) {
    const promises = [
        {
            type: ThumbnailType.MINIATURE,
            fieldName: 'thumbnailfile'
        },
        {
            type: ThumbnailType.PREVIEW,
            fieldName: 'previewfile'
        }
    ].map(p => {
        const fields = files === null || files === void 0 ? void 0 : files[p.fieldName];
        if (!fields)
            return undefined;
        return updateLocalVideoMiniatureFromExisting({
            inputPath: fields[0].path,
            video,
            type: p.type,
            automaticallyGenerated: false
        });
    });
    const thumbnailsOrUndefined = await Promise.all(promises);
    return thumbnailsOrUndefined.filter(t => !!t);
}
//# sourceMappingURL=update.js.map