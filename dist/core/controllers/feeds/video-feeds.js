import express from 'express';
import { extname } from 'path';
import { cacheRouteFactory } from '../../middlewares/index.js';
import { VideoInclude, VideoResolution } from '@peertube/peertube-models';
import { buildNSFWFilter } from '../../helpers/express-utils.js';
import { ROUTE_CACHE_LIFETIME, WEBSERVER } from '../../initializers/constants.js';
import { asyncMiddleware, commonVideosFiltersValidator, feedsFormatValidator, setDefaultVideosSort, setFeedFormatContentType, feedsAccountOrChannelFiltersValidator, videosSortValidator, videoSubscriptionFeedsValidator } from '../../middlewares/index.js';
import { buildFeedMetadata, getCommonVideoFeedAttributes, getVideosForFeeds, initFeed, sendFeed } from './shared/index.js';
import { getVideoFileMimeType } from '../../lib/video-file.js';
const videoFeedsRouter = express.Router();
const { middleware: cacheRouteMiddleware } = cacheRouteFactory({
    headerBlacklist: ['Content-Type']
});
videoFeedsRouter.get('/videos.:format', videosSortValidator, setDefaultVideosSort, feedsFormatValidator, setFeedFormatContentType, cacheRouteMiddleware(ROUTE_CACHE_LIFETIME.FEEDS), commonVideosFiltersValidator, asyncMiddleware(feedsAccountOrChannelFiltersValidator), asyncMiddleware(generateVideoFeed));
videoFeedsRouter.get('/subscriptions.:format', videosSortValidator, setDefaultVideosSort, feedsFormatValidator, setFeedFormatContentType, cacheRouteMiddleware(ROUTE_CACHE_LIFETIME.FEEDS), commonVideosFiltersValidator, asyncMiddleware(videoSubscriptionFeedsValidator), asyncMiddleware(generateVideoFeedForSubscriptions));
export { videoFeedsRouter };
async function generateVideoFeed(req, res) {
    const account = res.locals.account;
    const videoChannel = res.locals.videoChannel;
    const { name, description, imageUrl, accountImageUrl, link, accountLink } = await buildFeedMetadata({ videoChannel, account });
    const feed = initFeed({
        name,
        description,
        link,
        isPodcast: false,
        imageUrl,
        author: { name, link: accountLink, imageUrl: accountImageUrl },
        resourceType: 'videos',
        queryString: new URL(WEBSERVER.URL + req.url).search
    });
    const data = await getVideosForFeeds({
        sort: req.query.sort,
        nsfw: buildNSFWFilter(res, req.query.nsfw),
        isLocal: req.query.isLocal,
        include: req.query.include | VideoInclude.FILES,
        accountId: account === null || account === void 0 ? void 0 : account.id,
        videoChannelId: videoChannel === null || videoChannel === void 0 ? void 0 : videoChannel.id
    });
    addVideosToFeed(feed, data);
    return sendFeed(feed, req, res);
}
async function generateVideoFeedForSubscriptions(req, res) {
    const account = res.locals.account;
    const { name, description, imageUrl, link } = await buildFeedMetadata({ account });
    const feed = initFeed({
        name,
        description,
        link,
        isPodcast: false,
        imageUrl,
        resourceType: 'videos',
        queryString: new URL(WEBSERVER.URL + req.url).search
    });
    const data = await getVideosForFeeds({
        sort: req.query.sort,
        nsfw: buildNSFWFilter(res, req.query.nsfw),
        isLocal: req.query.isLocal,
        include: req.query.include | VideoInclude.FILES,
        displayOnlyForFollower: {
            actorId: res.locals.user.Account.Actor.id,
            orLocalVideos: false
        },
        user: res.locals.user
    });
    addVideosToFeed(feed, data);
    return sendFeed(feed, req, res);
}
function addVideosToFeed(feed, videos) {
    for (const video of videos) {
        const formattedVideoFiles = video.getFormattedAllVideoFilesJSON(false);
        const torrents = formattedVideoFiles.map(videoFile => ({
            title: video.name,
            url: videoFile.torrentUrl,
            size_in_bytes: videoFile.size
        }));
        const videoFiles = formattedVideoFiles.map(videoFile => {
            return {
                type: getVideoFileMimeType(extname(videoFile.fileUrl), videoFile.resolution.id === VideoResolution.H_NOVIDEO),
                medium: 'video',
                height: videoFile.resolution.id,
                fileSize: videoFile.size,
                url: videoFile.fileUrl,
                framerate: videoFile.fps,
                duration: video.duration,
                lang: video.language
            };
        });
        feed.addItem(Object.assign(Object.assign({}, getCommonVideoFeedAttributes(video)), { id: WEBSERVER.URL + video.getWatchStaticPath(), author: [
                {
                    name: video.VideoChannel.getDisplayName(),
                    link: video.VideoChannel.getClientUrl()
                }
            ], torrents, video: videoFiles.length !== 0
                ? {
                    url: videoFiles[0].url,
                    length: videoFiles[0].fileSize,
                    type: videoFiles[0].type
                }
                : undefined, videos: videoFiles, embed: {
                url: WEBSERVER.URL + video.getEmbedStaticPath(),
                allowFullscreen: true
            }, player: {
                url: WEBSERVER.URL + video.getWatchStaticPath()
            }, community: {
                statistics: {
                    views: video.views
                }
            } }));
    }
}
//# sourceMappingURL=video-feeds.js.map