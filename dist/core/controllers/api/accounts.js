import express from 'express';
import { pickCommonVideoQuery } from '../../helpers/query.js';
import { ActorFollowModel } from '../../models/actor/actor-follow.js';
import { getServerActor } from '../../models/application/application.js';
import { VideoChannelSyncModel } from '../../models/video/video-channel-sync.js';
import { buildNSFWFilter, getCountVideos, isUserAbleToSearchRemoteURI } from '../../helpers/express-utils.js';
import { getFormattedObjects } from '../../helpers/utils.js';
import { JobQueue } from '../../lib/job-queue/index.js';
import { Hooks } from '../../lib/plugins/hooks.js';
import { apiRateLimiter, asyncMiddleware, authenticate, commonVideosFiltersValidator, optionalAuthenticate, paginationValidator, setDefaultPagination, setDefaultSort, setDefaultVideosSort, videoPlaylistsSortValidator, videoRatesSortValidator, videoRatingValidator } from '../../middlewares/index.js';
import { accountNameWithHostGetValidator, accountsFollowersSortValidator, accountsSortValidator, ensureAuthUserOwnsAccountValidator, ensureCanManageChannelOrAccount, videoChannelsSortValidator, videoChannelStatsValidator, videoChannelSyncsSortValidator, videosSortValidator } from '../../middlewares/validators/index.js';
import { commonVideoPlaylistFiltersValidator, videoPlaylistsSearchValidator } from '../../middlewares/validators/videos/video-playlists.js';
import { AccountModel } from '../../models/account/account.js';
import { AccountVideoRateModel } from '../../models/account/account-video-rate.js';
import { guessAdditionalAttributesFromQuery } from '../../models/video/formatter/index.js';
import { VideoModel } from '../../models/video/video.js';
import { VideoChannelModel } from '../../models/video/video-channel.js';
import { VideoPlaylistModel } from '../../models/video/video-playlist.js';
const accountsRouter = express.Router();
accountsRouter.use(apiRateLimiter);
accountsRouter.get('/', paginationValidator, accountsSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listAccounts));
accountsRouter.get('/:accountName', asyncMiddleware(accountNameWithHostGetValidator), getAccount);
accountsRouter.get('/:accountName/videos', asyncMiddleware(accountNameWithHostGetValidator), paginationValidator, videosSortValidator, setDefaultVideosSort, setDefaultPagination, optionalAuthenticate, commonVideosFiltersValidator, asyncMiddleware(listAccountVideos));
accountsRouter.get('/:accountName/video-channels', asyncMiddleware(accountNameWithHostGetValidator), videoChannelStatsValidator, paginationValidator, videoChannelsSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listAccountChannels));
accountsRouter.get('/:accountName/video-channel-syncs', authenticate, asyncMiddleware(accountNameWithHostGetValidator), ensureCanManageChannelOrAccount, paginationValidator, videoChannelSyncsSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listAccountChannelsSync));
accountsRouter.get('/:accountName/video-playlists', optionalAuthenticate, asyncMiddleware(accountNameWithHostGetValidator), paginationValidator, videoPlaylistsSortValidator, setDefaultSort, setDefaultPagination, commonVideoPlaylistFiltersValidator, videoPlaylistsSearchValidator, asyncMiddleware(listAccountPlaylists));
accountsRouter.get('/:accountName/ratings', authenticate, asyncMiddleware(accountNameWithHostGetValidator), ensureAuthUserOwnsAccountValidator, paginationValidator, videoRatesSortValidator, setDefaultSort, setDefaultPagination, videoRatingValidator, asyncMiddleware(listAccountRatings));
accountsRouter.get('/:accountName/followers', authenticate, asyncMiddleware(accountNameWithHostGetValidator), ensureAuthUserOwnsAccountValidator, paginationValidator, accountsFollowersSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listAccountFollowers));
export { accountsRouter };
function getAccount(req, res) {
    const account = res.locals.account;
    if (account.isOutdated()) {
        JobQueue.Instance.createJobAsync({ type: 'activitypub-refresher', payload: { type: 'actor', url: account.Actor.url } });
    }
    return res.json(account.toFormattedJSON());
}
async function listAccounts(req, res) {
    const resultList = await AccountModel.listForApi(req.query.start, req.query.count, req.query.sort);
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listAccountChannels(req, res) {
    const options = {
        accountId: res.locals.account.id,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        withStats: req.query.withStats,
        search: req.query.search
    };
    const resultList = await VideoChannelModel.listByAccountForAPI(options);
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listAccountChannelsSync(req, res) {
    const options = {
        accountId: res.locals.account.id,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search
    };
    const resultList = await VideoChannelSyncModel.listByAccountForAPI(options);
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listAccountPlaylists(req, res) {
    const serverActor = await getServerActor();
    let listMyPlaylists = false;
    if (res.locals.oauth && res.locals.oauth.token.User.Account.id === res.locals.account.id) {
        listMyPlaylists = true;
    }
    const resultList = await VideoPlaylistModel.listForApi({
        search: req.query.search,
        followerActorId: isUserAbleToSearchRemoteURI(res)
            ? null
            : serverActor.id,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        accountId: res.locals.account.id,
        listMyPlaylists,
        type: req.query.playlistType
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listAccountVideos(req, res) {
    const serverActor = await getServerActor();
    const account = res.locals.account;
    const displayOnlyForFollower = isUserAbleToSearchRemoteURI(res)
        ? null
        : {
            actorId: serverActor.id,
            orLocalVideos: true
        };
    const countVideos = getCountVideos(req);
    const query = pickCommonVideoQuery(req.query);
    const apiOptions = await Hooks.wrapObject(Object.assign(Object.assign({}, query), { displayOnlyForFollower, nsfw: buildNSFWFilter(res, query.nsfw), accountId: account.id, user: res.locals.oauth ? res.locals.oauth.token.User : undefined, countVideos }), 'filter:api.accounts.videos.list.params');
    const resultList = await Hooks.wrapPromiseFun(VideoModel.listForApi.bind(VideoModel), apiOptions, 'filter:api.accounts.videos.list.result');
    return res.json(getFormattedObjects(resultList.data, resultList.total, guessAdditionalAttributesFromQuery(query)));
}
async function listAccountRatings(req, res) {
    const account = res.locals.account;
    const resultList = await AccountVideoRateModel.listByAccountForApi({
        accountId: account.id,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        type: req.query.rating
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function listAccountFollowers(req, res) {
    const account = res.locals.account;
    const channels = await VideoChannelModel.listAllByAccount(account.id);
    const actorIds = [account.actorId].concat(channels.map(c => c.actorId));
    const resultList = await ActorFollowModel.listFollowersForApi({
        actorIds,
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search,
        state: 'accepted'
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
//# sourceMappingURL=accounts.js.map