import { LiveItemStatus } from '@peertube/feed/lib/typings/index.js';
import { maxBy, sortObjectComparator } from '@peertube/peertube-core-utils';
import { ActorImageType, VideoInclude, VideoResolution, VideoState } from '@peertube/peertube-models';
import { InternalEventEmitter } from '../../lib/internal-event-emitter.js';
import { Hooks } from '../../lib/plugins/hooks.js';
import { getVideoFileMimeType } from '../../lib/video-file.js';
import { buildPodcastGroupsCache, cacheRouteFactory, videoFeedsPodcastSetCacheKey } from '../../middlewares/index.js';
import express from 'express';
import { extname } from 'path';
import { buildNSFWFilter } from '../../helpers/express-utils.js';
import { MIMETYPES, ROUTE_CACHE_LIFETIME, WEBSERVER } from '../../initializers/constants.js';
import { asyncMiddleware, setFeedPodcastContentType, videoFeedsPodcastValidator } from '../../middlewares/index.js';
import { VideoCaptionModel } from '../../models/video/video-caption.js';
import { buildFeedMetadata, getCommonVideoFeedAttributes, getVideosForFeeds, initFeed } from './shared/index.js';
const videoPodcastFeedsRouter = express.Router();
const { middleware: podcastCacheRouteMiddleware, instance: podcastApiCache } = cacheRouteFactory({
    headerBlacklist: ['Content-Type']
});
for (const event of ['video-created', 'video-updated', 'video-deleted']) {
    InternalEventEmitter.Instance.on(event, ({ video }) => {
        if (video.remote)
            return;
        podcastApiCache.clearGroupSafe(buildPodcastGroupsCache({ channelId: video.channelId }));
    });
}
for (const event of ['channel-updated', 'channel-deleted']) {
    InternalEventEmitter.Instance.on(event, ({ channel }) => {
        podcastApiCache.clearGroupSafe(buildPodcastGroupsCache({ channelId: channel.id }));
    });
}
videoPodcastFeedsRouter.get('/podcast/videos.xml', setFeedPodcastContentType, videoFeedsPodcastSetCacheKey, podcastCacheRouteMiddleware(ROUTE_CACHE_LIFETIME.FEEDS), asyncMiddleware(videoFeedsPodcastValidator), asyncMiddleware(generateVideoPodcastFeed));
export { videoPodcastFeedsRouter };
async function generateVideoPodcastFeed(req, res) {
    const videoChannel = res.locals.videoChannel;
    const { name, userName, description, imageUrl, accountImageUrl, email, link, accountLink } = await buildFeedMetadata({ videoChannel });
    const data = await getVideosForFeeds({
        sort: '-publishedAt',
        nsfw: buildNSFWFilter(),
        isLocal: true,
        include: VideoInclude.FILES,
        videoChannelId: videoChannel === null || videoChannel === void 0 ? void 0 : videoChannel.id
    });
    const customTags = await Hooks.wrapObject([], 'filter:feed.podcast.channel.create-custom-tags.result', { videoChannel });
    const customXMLNS = await Hooks.wrapObject([], 'filter:feed.podcast.rss.create-custom-xmlns.result');
    const feed = initFeed({
        name,
        description,
        link,
        isPodcast: true,
        imageUrl,
        locked: email
            ? { isLocked: true, email }
            : undefined,
        person: [{ name: userName, href: accountLink, img: accountImageUrl }],
        resourceType: 'videos',
        queryString: new URL(WEBSERVER.URL + req.url).search,
        medium: 'video',
        customXMLNS,
        customTags
    });
    await addVideosToPodcastFeed(feed, data);
    return res.send(feed.podcast()).end();
}
async function generatePodcastItem(options) {
    const { video, liveItem, media } = options;
    const customTags = await Hooks.wrapObject([], 'filter:feed.podcast.video.create-custom-tags.result', { video, liveItem });
    const account = video.VideoChannel.Account;
    const author = {
        name: account.getDisplayName(),
        href: account.getClientUrl()
    };
    const commonAttributes = getCommonVideoFeedAttributes(video);
    const guid = liveItem
        ? `${video.uuid}_${video.publishedAt.toISOString()}`
        : commonAttributes.link;
    let personImage;
    if (account.Actor.hasImage(ActorImageType.AVATAR)) {
        const avatar = maxBy(account.Actor.Avatars, 'width');
        personImage = WEBSERVER.URL + avatar.getStaticPath();
    }
    return Object.assign(Object.assign({ guid }, commonAttributes), { trackers: video.getTrackerUrls(), author: [author], person: [
            Object.assign(Object.assign({}, author), { img: personImage })
        ], media, socialInteract: [
            {
                uri: video.url,
                protocol: 'activitypub',
                accountUrl: account.getClientUrl()
            }
        ], customTags });
}
async function addVideosToPodcastFeed(feed, videos) {
    const captionsGroup = await VideoCaptionModel.listCaptionsOfMultipleVideos(videos.map(v => v.id));
    for (const video of videos) {
        if (!video.isLive) {
            await addVODPodcastItem({ feed, video, captionsGroup });
        }
        else if (video.isLive && video.state !== VideoState.LIVE_ENDED) {
            await addLivePodcastItem({ feed, video });
        }
    }
}
async function addVODPodcastItem(options) {
    const { feed, video, captionsGroup } = options;
    const webVideos = video.getFormattedWebVideoFilesJSON(true)
        .map(f => buildVODWebVideoFile(video, f))
        .sort(sortObjectComparator('bitrate', 'desc'));
    const streamingPlaylistFiles = buildVODStreamingPlaylists(video);
    const media = [...webVideos, ...streamingPlaylistFiles];
    const videoCaptions = buildVODCaptions(video, captionsGroup[video.id]);
    const item = await generatePodcastItem({ video, liveItem: false, media });
    feed.addPodcastItem(Object.assign(Object.assign({}, item), { subTitle: videoCaptions }));
}
async function addLivePodcastItem(options) {
    const { feed, video } = options;
    let status;
    switch (video.state) {
        case VideoState.WAITING_FOR_LIVE:
            status = LiveItemStatus.pending;
            break;
        case VideoState.PUBLISHED:
            status = LiveItemStatus.live;
            break;
    }
    const item = await generatePodcastItem({ video, liveItem: true, media: buildLiveStreamingPlaylists(video) });
    feed.addPodcastLiveItem(Object.assign(Object.assign({}, item), { status, start: video.updatedAt.toISOString() }));
}
function buildVODWebVideoFile(video, videoFile) {
    const sources = [
        { uri: videoFile.fileUrl },
        { uri: videoFile.torrentUrl, contentType: 'application/x-bittorrent' }
    ];
    if (videoFile.magnetUri) {
        sources.push({ uri: videoFile.magnetUri });
    }
    return {
        type: getVideoFileMimeType(extname(videoFile.fileUrl), videoFile.resolution.id === VideoResolution.H_NOVIDEO),
        title: videoFile.resolution.label,
        length: videoFile.size,
        bitrate: videoFile.size / video.duration * 8,
        language: video.language,
        sources
    };
}
function buildVODStreamingPlaylists(video) {
    const hls = video.getHLSPlaylist();
    if (!hls)
        return [];
    return [
        {
            type: 'application/x-mpegURL',
            title: 'HLS',
            sources: [
                { uri: hls.getMasterPlaylistUrl(video) }
            ],
            language: video.language
        }
    ];
}
function buildLiveStreamingPlaylists(video) {
    const hls = video.getHLSPlaylist();
    return [
        {
            type: 'application/x-mpegURL',
            title: `HLS live stream`,
            sources: [
                { uri: hls.getMasterPlaylistUrl(video) }
            ],
            language: video.language
        }
    ];
}
function buildVODCaptions(video, videoCaptions) {
    return videoCaptions.map(caption => {
        const type = MIMETYPES.VIDEO_CAPTIONS.EXT_MIMETYPE[extname(caption.filename)];
        if (!type)
            return null;
        return {
            url: caption.getFileUrl(video),
            language: caption.language,
            type,
            rel: 'captions'
        };
    }).filter(c => c);
}
//# sourceMappingURL=video-podcast-feeds.js.map