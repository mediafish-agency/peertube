import { ActivityTagObject, ActivityUrlObject, VideoObject } from '@peertube/peertube-models';
import { AttributesOnly } from '@peertube/peertube-typescript-utils';
import { VideoFileModel } from '../../../../models/video/video-file.js';
import { VideoStreamingPlaylistModel } from '../../../../models/video/video-streaming-playlist.js';
import { FilteredModelAttributes } from '../../../../types/index.js';
import { MChannelId, MStreamingPlaylistVideo, MVideo, MVideoId } from '../../../../types/models/index.js';
export declare function getThumbnailFromIcons(videoObject: VideoObject): import("@peertube/peertube-models").ActivityIconObject;
export declare function getPreviewFromIcons(videoObject: VideoObject): import("@peertube/peertube-models").ActivityIconObject;
export declare function getTagsFromObject(videoObject: VideoObject): string[];
export declare function getFileAttributesFromUrl(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, urls: (ActivityTagObject | ActivityUrlObject)[]): FilteredModelAttributes<VideoFileModel>[];
export declare function getStreamingPlaylistAttributesFromObject(video: MVideoId, videoObject: VideoObject): (Partial<AttributesOnly<VideoStreamingPlaylistModel>> & {
    id?: number | any;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    deletedAt?: Date | any;
    version?: number | any;
} & {
    tagAPObject?: ActivityTagObject[];
})[];
export declare function getLiveAttributesFromObject(video: MVideoId, videoObject: VideoObject): {
    saveReplay: boolean;
    permanentLive: boolean;
    latencyMode: import("@peertube/peertube-models").LiveVideoLatencyModeType;
    videoId: number;
};
export declare function getCaptionAttributesFromObject(video: MVideoId, videoObject: VideoObject): {
    videoId: number;
    filename: string;
    language: string;
    automaticallyGenerated: boolean;
    fileUrl: string;
}[];
export declare function getStoryboardAttributeFromObject(video: MVideoId, videoObject: VideoObject): {
    filename: string;
    totalHeight: number;
    totalWidth: number;
    spriteHeight: number;
    spriteWidth: number;
    spriteDuration: number;
    fileUrl: string;
    videoId: number;
};
export declare function getVideoAttributesFromObject(videoChannel: MChannelId, videoObject: VideoObject, to?: string[]): {
    name: string;
    uuid: string;
    url: string;
    category: number;
    licence: number;
    language: string;
    description: string;
    support: string;
    nsfw: boolean;
    commentsPolicy: import("@peertube/peertube-models").VideoCommentPolicyType;
    downloadEnabled: boolean;
    waitTranscoding: boolean;
    isLive: boolean;
    state: import("@peertube/peertube-models").VideoStateType;
    aspectRatio: number;
    channelId: number;
    duration: number;
    createdAt: Date;
    publishedAt: Date;
    originallyPublishedAt: Date;
    inputFileUpdatedAt: Date;
    updatedAt: Date;
    views: number;
    remote: boolean;
    privacy: 1 | 2;
};
//# sourceMappingURL=object-to-model-attributes.d.ts.map