import { HttpStatusCode, VideoChangeOwnershipStatus } from '@peertube/peertube-models';
import { canVideoBeFederated } from '../../../lib/activitypub/videos/federate.js';
import express from 'express';
import { logger } from '../../../helpers/logger.js';
import { getFormattedObjects } from '../../../helpers/utils.js';
import { sequelizeTypescript } from '../../../initializers/database.js';
import { sendUpdateVideo } from '../../../lib/activitypub/send/index.js';
import { changeVideoChannelShare } from '../../../lib/activitypub/share.js';
import { asyncMiddleware, asyncRetryTransactionMiddleware, authenticate, paginationValidator, setDefaultPagination, videosAcceptChangeOwnershipValidator, videosChangeOwnershipValidator, videosTerminateChangeOwnershipValidator } from '../../../middlewares/index.js';
import { VideoChangeOwnershipModel } from '../../../models/video/video-change-ownership.js';
import { VideoChannelModel } from '../../../models/video/video-channel.js';
import { VideoModel } from '../../../models/video/video.js';
const ownershipVideoRouter = express.Router();
ownershipVideoRouter.post('/:videoId/give-ownership', authenticate, asyncMiddleware(videosChangeOwnershipValidator), asyncRetryTransactionMiddleware(giveVideoOwnership));
ownershipVideoRouter.get('/ownership', authenticate, paginationValidator, setDefaultPagination, asyncRetryTransactionMiddleware(listVideoOwnership));
ownershipVideoRouter.post('/ownership/:id/accept', authenticate, asyncMiddleware(videosTerminateChangeOwnershipValidator), asyncMiddleware(videosAcceptChangeOwnershipValidator), asyncRetryTransactionMiddleware(acceptOwnership));
ownershipVideoRouter.post('/ownership/:id/refuse', authenticate, asyncMiddleware(videosTerminateChangeOwnershipValidator), asyncRetryTransactionMiddleware(refuseOwnership));
export { ownershipVideoRouter };
async function giveVideoOwnership(req, res) {
    const videoInstance = res.locals.videoAll;
    const initiatorAccountId = res.locals.oauth.token.User.Account.id;
    const nextOwner = res.locals.nextOwner;
    await sequelizeTypescript.transaction(t => {
        return VideoChangeOwnershipModel.findOrCreate({
            where: {
                initiatorAccountId,
                nextOwnerAccountId: nextOwner.id,
                videoId: videoInstance.id,
                status: VideoChangeOwnershipStatus.WAITING
            },
            defaults: {
                initiatorAccountId,
                nextOwnerAccountId: nextOwner.id,
                videoId: videoInstance.id,
                status: VideoChangeOwnershipStatus.WAITING
            },
            transaction: t
        });
    });
    logger.info('Ownership change for video %s created.', videoInstance.name);
    return res.type('json')
        .status(HttpStatusCode.NO_CONTENT_204)
        .end();
}
async function listVideoOwnership(req, res) {
    const currentAccountId = res.locals.oauth.token.User.Account.id;
    const resultList = await VideoChangeOwnershipModel.listForApi(currentAccountId, req.query.start || 0, req.query.count || 10, req.query.sort || 'createdAt');
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
function acceptOwnership(req, res) {
    return sequelizeTypescript.transaction(async (t) => {
        const videoChangeOwnership = res.locals.videoChangeOwnership;
        const channel = res.locals.videoChannel;
        const targetVideo = await VideoModel.loadFull(videoChangeOwnership.Video.id, t);
        const oldVideoChannel = await VideoChannelModel.loadAndPopulateAccount(targetVideo.channelId, t);
        targetVideo.channelId = channel.id;
        const targetVideoUpdated = await targetVideo.save({ transaction: t });
        targetVideoUpdated.VideoChannel = channel;
        if (canVideoBeFederated(targetVideoUpdated)) {
            await changeVideoChannelShare(targetVideoUpdated, oldVideoChannel, t);
            await sendUpdateVideo(targetVideoUpdated, t, oldVideoChannel.Account.Actor);
        }
        videoChangeOwnership.status = VideoChangeOwnershipStatus.ACCEPTED;
        await videoChangeOwnership.save({ transaction: t });
        return res.status(HttpStatusCode.NO_CONTENT_204).end();
    });
}
function refuseOwnership(req, res) {
    return sequelizeTypescript.transaction(async (t) => {
        const videoChangeOwnership = res.locals.videoChangeOwnership;
        videoChangeOwnership.status = VideoChangeOwnershipStatus.REFUSED;
        await videoChangeOwnership.save({ transaction: t });
        return res.status(HttpStatusCode.NO_CONTENT_204).end();
    });
}
//# sourceMappingURL=ownership.js.map