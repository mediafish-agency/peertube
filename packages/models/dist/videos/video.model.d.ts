import { Account, AccountSummary } from '../actors/index.js';
import { VideoChannel, VideoChannelSummary } from './channel/video-channel.model.js';
import { VideoFile } from './file/index.js';
import { VideoCommentPolicyType } from './index.js';
import { VideoConstant } from './video-constant.model.js';
import { VideoPrivacyType } from './video-privacy.enum.js';
import { VideoScheduleUpdate } from './video-schedule-update.model.js';
import { VideoSource } from './video-source.model.js';
import { VideoStateType } from './video-state.enum.js';
import { VideoStreamingPlaylist } from './video-streaming-playlist.model.js';
export interface Video extends Partial<VideoAdditionalAttributes> {
    id: number;
    uuid: string;
    shortUUID: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    publishedAt: Date | string;
    originallyPublishedAt: Date | string;
    category: VideoConstant<number>;
    licence: VideoConstant<number>;
    language: VideoConstant<string>;
    privacy: VideoConstant<VideoPrivacyType>;
    description: string;
    truncatedDescription: string;
    duration: number;
    isLocal: boolean;
    name: string;
    aspectRatio: number | null;
    isLive: boolean;
    thumbnailPath: string;
    thumbnailUrl?: string;
    previewPath: string;
    previewUrl?: string;
    embedPath: string;
    embedUrl?: string;
    url: string;
    views: number;
    viewers: number;
    likes: number;
    dislikes: number;
    nsfw: boolean;
    account: AccountSummary;
    channel: VideoChannelSummary;
    userHistory?: {
        currentTime: number;
    };
    pluginData?: any;
}
export interface VideoAdditionalAttributes {
    waitTranscoding: boolean;
    state: VideoConstant<VideoStateType>;
    scheduledUpdate: VideoScheduleUpdate;
    blacklisted: boolean;
    blacklistedReason: string;
    blockedOwner: boolean;
    blockedServer: boolean;
    files: VideoFile[];
    streamingPlaylists: VideoStreamingPlaylist[];
    videoSource: VideoSource;
    automaticTags: string[];
}
export interface VideoDetails extends Video {
    descriptionPath: string;
    support: string;
    channel: VideoChannel;
    account: Account;
    tags: string[];
    commentsEnabled: boolean;
    commentsPolicy: {
        id: VideoCommentPolicyType;
        label: string;
    };
    downloadEnabled: boolean;
    waitTranscoding: boolean;
    state: VideoConstant<VideoStateType>;
    trackerUrls: string[];
    files: VideoFile[];
    streamingPlaylists: VideoStreamingPlaylist[];
    inputFileUpdatedAt: string | Date;
}
//# sourceMappingURL=video.model.d.ts.map