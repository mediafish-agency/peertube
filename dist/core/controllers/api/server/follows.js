import express from 'express';
import { HttpStatusCode, UserRight } from '@peertube/peertube-models';
import { getServerActor } from '../../../models/application/application.js';
import { logger } from '../../../helpers/logger.js';
import { getFormattedObjects } from '../../../helpers/utils.js';
import { sequelizeTypescript } from '../../../initializers/database.js';
import { autoFollowBackIfNeeded } from '../../../lib/activitypub/follow.js';
import { sendAccept, sendReject, sendUndoFollow } from '../../../lib/activitypub/send/index.js';
import { JobQueue } from '../../../lib/job-queue/index.js';
import { removeRedundanciesOfServer } from '../../../lib/redundancy.js';
import { asyncMiddleware, authenticate, ensureUserHasRight, paginationValidator, setBodyHostsPort, setDefaultPagination, setDefaultSort } from '../../../middlewares/index.js';
import { acceptFollowerValidator, followValidator, getFollowerValidator, instanceFollowersSortValidator, instanceFollowingSortValidator, listFollowsValidator, rejectFollowerValidator, removeFollowingValidator } from '../../../middlewares/validators/index.js';
import { ActorFollowModel } from '../../../models/actor/actor-follow.js';
const serverFollowsRouter = express.Router();
serverFollowsRouter.get('/following', listFollowsValidator, paginationValidator, instanceFollowingSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listFollowing));
serverFollowsRouter.post('/following', authenticate, ensureUserHasRight(UserRight.MANAGE_SERVER_FOLLOW), followValidator, setBodyHostsPort, asyncMiddleware(addFollow));
serverFollowsRouter.delete('/following/:hostOrHandle', authenticate, ensureUserHasRight(UserRight.MANAGE_SERVER_FOLLOW), asyncMiddleware(removeFollowingValidator), asyncMiddleware(removeFollowing));
serverFollowsRouter.get('/followers', listFollowsValidator, paginationValidator, instanceFollowersSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listFollowers));
serverFollowsRouter.delete('/followers/:nameWithHost', authenticate, ensureUserHasRight(UserRight.MANAGE_SERVER_FOLLOW), asyncMiddleware(getFollowerValidator), asyncMiddleware(removeFollower));
serverFollowsRouter.post('/followers/:nameWithHost/reject', authenticate, ensureUserHasRight(UserRight.MANAGE_SERVER_FOLLOW), asyncMiddleware(getFollowerValidator), rejectFollowerValidator, asyncMiddleware(rejectFollower));
serverFollowsRouter.post('/followers/:nameWithHost/accept', authenticate, ensureUserHasRight(UserRight.MANAGE_SERVER_FOLLOW), asyncMiddleware(getFollowerValidator), acceptFollowerValidator, asyncMiddleware(acceptFollower));
export { serverFollowsRouter };
async function listFollowing(req, res) {
    const serverActor = await getServerActor();
    const resultList = await ActorFollowModel.listInstanceFollowingForApi({
        followerId: serverActor.id,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search,
        actorType: req.query.actorType,
        state: req.query.state
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listFollowers(req, res) {
    const serverActor = await getServerActor();
    const resultList = await ActorFollowModel.listFollowersForApi({
        actorIds: [serverActor.id],
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search,
        actorType: req.query.actorType,
        state: req.query.state
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function addFollow(req, res) {
    const { hosts, handles } = req.body;
    const follower = await getServerActor();
    for (const host of hosts) {
        const payload = {
            host,
            followerActorId: follower.id
        };
        JobQueue.Instance.createJobAsync({ type: 'activitypub-follow', payload });
    }
    for (const handle of handles) {
        const [name, host] = handle.split('@');
        const payload = {
            host,
            name,
            followerActorId: follower.id
        };
        JobQueue.Instance.createJobAsync({ type: 'activitypub-follow', payload });
    }
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
async function removeFollowing(req, res) {
    const follow = res.locals.follow;
    await sequelizeTypescript.transaction(async (t) => {
        if (follow.state === 'accepted')
            sendUndoFollow(follow, t);
        const server = follow.ActorFollowing.Server;
        server.redundancyAllowed = false;
        await server.save({ transaction: t });
        removeRedundanciesOfServer(server.id)
            .catch(err => logger.error('Cannot remove redundancy of %s.', server.host, { err }));
        await follow.destroy({ transaction: t });
    });
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
async function rejectFollower(req, res) {
    const follow = res.locals.follow;
    follow.state = 'rejected';
    await follow.save();
    sendReject(follow.url, follow.ActorFollower, follow.ActorFollowing);
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
async function removeFollower(req, res) {
    const follow = res.locals.follow;
    if (follow.state === 'accepted' || follow.state === 'pending') {
        sendReject(follow.url, follow.ActorFollower, follow.ActorFollowing);
    }
    await follow.destroy();
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
async function acceptFollower(req, res) {
    const follow = res.locals.follow;
    sendAccept(follow);
    follow.state = 'accepted';
    await follow.save();
    await autoFollowBackIfNeeded(follow);
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
//# sourceMappingURL=follows.js.map