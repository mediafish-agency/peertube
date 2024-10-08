import { logger, loggerTagsFactory } from '../helpers/logger.js';
import { YoutubeDLWrapper } from '../helpers/youtube-dl/index.js';
import { CONFIG } from '../initializers/config.js';
import { buildYoutubeDLImport } from './video-pre-import.js';
import { UserModel } from '../models/user/user.js';
import { VideoImportModel } from '../models/video/video-import.js';
import { VideoChannelSyncState, VideoPrivacy } from '@peertube/peertube-models';
import { JobQueue } from './job-queue/index.js';
import { ServerConfigManager } from './server-config-manager.js';
const lTags = loggerTagsFactory('channel-synchronization');
export async function synchronizeChannel(options) {
    const { channel, externalChannelUrl, videosCountLimit, onlyAfter, channelSync } = options;
    if (channelSync) {
        channelSync.state = VideoChannelSyncState.PROCESSING;
        channelSync.lastSyncAt = new Date();
        await channelSync.save();
    }
    try {
        const user = await UserModel.loadByChannelActorId(channel.actorId);
        const youtubeDL = new YoutubeDLWrapper(externalChannelUrl, ServerConfigManager.Instance.getEnabledResolutions('vod'), CONFIG.TRANSCODING.ALWAYS_TRANSCODE_ORIGINAL_RESOLUTION);
        const targetUrls = await youtubeDL.getInfoForListImport({ latestVideosCount: videosCountLimit });
        logger.info('Fetched %d candidate URLs for sync channel %s.', targetUrls.length, channel.Actor.preferredUsername, Object.assign({ targetUrls }, lTags()));
        if (targetUrls.length === 0) {
            if (channelSync) {
                channelSync.state = VideoChannelSyncState.SYNCED;
                await channelSync.save();
            }
            return;
        }
        const children = [];
        for (const targetUrl of targetUrls) {
            logger.debug(`Import candidate: ${targetUrl}`, lTags());
            try {
                if (await skipImport(channel, targetUrl, onlyAfter))
                    continue;
                const { job } = await buildYoutubeDLImport({
                    user,
                    channel,
                    targetUrl,
                    channelSync,
                    importDataOverride: {
                        privacy: VideoPrivacy.PUBLIC
                    }
                });
                children.push(job);
            }
            catch (err) {
                logger.error(`Cannot build import for ${targetUrl} in channel ${channel.name}`, Object.assign({ err }, lTags()));
            }
        }
        const parent = {
            type: 'after-video-channel-import',
            payload: {
                channelSyncId: channelSync === null || channelSync === void 0 ? void 0 : channelSync.id
            }
        };
        await JobQueue.Instance.createJobWithChildren(parent, children);
    }
    catch (err) {
        logger.error(`Failed to import ${externalChannelUrl} in channel ${channel.name}`, Object.assign({ err }, lTags()));
        channelSync.state = VideoChannelSyncState.FAILED;
        await channelSync.save();
    }
}
async function skipImport(channel, targetUrl, onlyAfter) {
    if (await VideoImportModel.urlAlreadyImported(channel.id, targetUrl)) {
        logger.debug('%s is already imported for channel %s, skipping video channel synchronization.', targetUrl, channel.name, lTags());
        return true;
    }
    if (onlyAfter) {
        const youtubeDL = new YoutubeDLWrapper(targetUrl, ServerConfigManager.Instance.getEnabledResolutions('vod'), CONFIG.TRANSCODING.ALWAYS_TRANSCODE_ORIGINAL_RESOLUTION);
        const videoInfo = await youtubeDL.getInfoForDownload();
        const onlyAfterWithoutTime = new Date(onlyAfter);
        onlyAfterWithoutTime.setHours(0, 0, 0, 0);
        if (videoInfo.originallyPublishedAtWithoutTime.getTime() < onlyAfterWithoutTime.getTime()) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=sync-channel.js.map