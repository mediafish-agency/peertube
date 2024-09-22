import { ResultList, Video, VideoDetails, VideoFile, VideoFileStreamType, VideoIncludeType, VideoObject, VideoRateType, type VideoCommentPolicyType, type VideoPrivacyType, type VideoStateType } from '@peertube/peertube-models';
import { MVideoSource } from '../../types/models/video/video-source.js';
import Bluebird from 'bluebird';
import { Transaction } from 'sequelize';
import { MChannel, MChannelId, MStreamingPlaylist, MStreamingPlaylistFilesVideo, MUserAccountId, MUserId, MVideoAP, MVideoAPLight, MVideoAccountLightBlacklistAllFiles, MVideoDetails, MVideoFileVideo, MVideoForUser, MVideoFormattable, MVideoFormattableDetails, MVideoFullLight, MVideoId, MVideoImmutable, MVideoThumbnail, MVideoThumbnailBlacklist, MVideoWithAllFiles, MVideoWithFile, type MVideo, type MVideoAccountLight } from '../../types/models/index.js';
import { MThumbnail } from '../../types/models/video/thumbnail.js';
import { MVideoFile, MVideoFileStreamingPlaylistVideo } from '../../types/models/video/video-file.js';
import { VideoAbuseModel } from '../abuse/video-abuse.js';
import { AccountVideoRateModel } from '../account/account-video-rate.js';
import { VideoAutomaticTagModel } from '../automatic-tag/video-automatic-tag.js';
import { TrackerModel } from '../server/tracker.js';
import { SequelizeModel } from '../shared/index.js';
import { UserVideoHistoryModel } from '../user/user-video-history.js';
import { VideoViewModel } from '../view/video-view.js';
import { VideoFormattingJSONOptions } from './formatter/video-api-format.js';
import { ScheduleVideoUpdateModel } from './schedule-video-update.js';
import { DisplayOnlyForFollowerOptions } from './sql/video/index.js';
import { StoryboardModel } from './storyboard.js';
import { TagModel } from './tag.js';
import { ThumbnailModel } from './thumbnail.js';
import { VideoBlacklistModel } from './video-blacklist.js';
import { VideoCaptionModel } from './video-caption.js';
import { VideoChannelModel } from './video-channel.js';
import { VideoCommentModel } from './video-comment.js';
import { VideoFileModel } from './video-file.js';
import { VideoImportModel } from './video-import.js';
import { VideoJobInfoModel } from './video-job-info.js';
import { VideoLiveModel } from './video-live.js';
import { VideoPasswordModel } from './video-password.js';
import { VideoPlaylistElementModel } from './video-playlist-element.js';
import { VideoShareModel } from './video-share.js';
import { VideoSourceModel } from './video-source.js';
import { VideoStreamingPlaylistModel } from './video-streaming-playlist.js';
export declare enum ScopeNames {
    FOR_API = "FOR_API",
    WITH_ACCOUNT_DETAILS = "WITH_ACCOUNT_DETAILS",
    WITH_TAGS = "WITH_TAGS",
    WITH_WEB_VIDEO_FILES = "WITH_WEB_VIDEO_FILES",
    WITH_SCHEDULED_UPDATE = "WITH_SCHEDULED_UPDATE",
    WITH_BLACKLISTED = "WITH_BLACKLISTED",
    WITH_STREAMING_PLAYLISTS = "WITH_STREAMING_PLAYLISTS",
    WITH_IMMUTABLE_ATTRIBUTES = "WITH_IMMUTABLE_ATTRIBUTES",
    WITH_USER_HISTORY = "WITH_USER_HISTORY",
    WITH_THUMBNAILS = "WITH_THUMBNAILS"
}
export type ForAPIOptions = {
    ids?: number[];
    videoPlaylistId?: number;
    withAccountBlockerIds?: number[];
};
export declare class VideoModel extends SequelizeModel<VideoModel> {
    uuid: string;
    name: string;
    category: number;
    licence: number;
    language: string;
    privacy: VideoPrivacyType;
    nsfw: boolean;
    description: string;
    support: string;
    duration: number;
    views: number;
    likes: number;
    dislikes: number;
    remote: boolean;
    isLive: boolean;
    url: string;
    commentsPolicy: VideoCommentPolicyType;
    downloadEnabled: boolean;
    waitTranscoding: boolean;
    state: VideoStateType;
    aspectRatio: number;
    inputFileUpdatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    originallyPublishedAt: Date;
    channelId: number;
    VideoChannel: Awaited<VideoChannelModel>;
    Tags: Awaited<TagModel>[];
    Trackers: Awaited<TrackerModel>[];
    Thumbnails: Awaited<ThumbnailModel>[];
    VideoPlaylistElements: Awaited<VideoPlaylistElementModel>[];
    VideoSource: Awaited<VideoSourceModel>;
    VideoAbuses: Awaited<VideoAbuseModel>[];
    VideoFiles: Awaited<VideoFileModel>[];
    VideoStreamingPlaylists: Awaited<VideoStreamingPlaylistModel>[];
    VideoShares: Awaited<VideoShareModel>[];
    AccountVideoRates: Awaited<AccountVideoRateModel>[];
    VideoComments: Awaited<VideoCommentModel>[];
    VideoViews: Awaited<VideoViewModel>[];
    UserVideoHistories: Awaited<UserVideoHistoryModel>[];
    ScheduleVideoUpdate: Awaited<ScheduleVideoUpdateModel>;
    VideoBlacklist: Awaited<VideoBlacklistModel>;
    VideoLive: Awaited<VideoLiveModel>;
    VideoImport: Awaited<VideoImportModel>;
    VideoCaptions: Awaited<VideoCaptionModel>[];
    VideoPasswords: Awaited<VideoPasswordModel>[];
    VideoAutomaticTags: Awaited<VideoAutomaticTagModel>[];
    VideoJobInfo: Awaited<VideoJobInfoModel>;
    Storyboard: Awaited<StoryboardModel>;
    static notifyCreate(video: MVideo): void;
    static notifyUpdate(video: MVideo): void;
    static notifyDestroy(video: MVideo): void;
    static stopLiveIfNeeded(instance: VideoModel): void;
    static invalidateCache(instance: VideoModel): void;
    static sendDelete(instance: MVideoAccountLight, options: {
        transaction: Transaction;
    }): Promise<any>;
    static removeFiles(instance: VideoModel, options: any): Promise<any>;
    static saveEssentialDataToAbuses(instance: VideoModel, options: any): Promise<any>;
    static listLocalIds(): Promise<number[]>;
    static listAllAndSharedByActorForOutbox(actorId: number, start: number, count: number): Bluebird<{
        data: VideoModel[];
        total: number;
    }>;
    static listPublishedLiveUUIDs(): Promise<string[]>;
    static listUserVideosForApi(options: {
        accountId: number;
        start: number;
        count: number;
        sort: string;
        channelId?: number;
        isLive?: boolean;
        search?: string;
    }): Promise<{
        data: MVideoForUser[];
        total: number;
    }>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
        nsfw: boolean;
        isLive?: boolean;
        isLocal?: boolean;
        include?: VideoIncludeType;
        hasFiles?: boolean;
        hasWebtorrentFiles?: boolean;
        hasWebVideoFiles?: boolean;
        hasHLSFiles?: boolean;
        categoryOneOf?: number[];
        licenceOneOf?: number[];
        languageOneOf?: string[];
        tagsOneOf?: string[];
        tagsAllOf?: string[];
        privacyOneOf?: VideoPrivacyType[];
        accountId?: number;
        videoChannelId?: number;
        displayOnlyForFollower: DisplayOnlyForFollowerOptions | null;
        videoPlaylistId?: number;
        trendingDays?: number;
        user?: MUserAccountId;
        historyOfUser?: MUserId;
        countVideos?: boolean;
        search?: string;
        excludeAlreadyWatched?: boolean;
        autoTagOneOf?: string[];
    }): Promise<ResultList<VideoModel>>;
    static searchAndPopulateAccountAndServer(options: {
        start: number;
        count: number;
        sort: string;
        nsfw?: boolean;
        isLive?: boolean;
        isLocal?: boolean;
        include?: VideoIncludeType;
        categoryOneOf?: number[];
        licenceOneOf?: number[];
        languageOneOf?: string[];
        tagsOneOf?: string[];
        tagsAllOf?: string[];
        privacyOneOf?: VideoPrivacyType[];
        displayOnlyForFollower: DisplayOnlyForFollowerOptions | null;
        user?: MUserAccountId;
        hasWebtorrentFiles?: boolean;
        hasWebVideoFiles?: boolean;
        hasHLSFiles?: boolean;
        search?: string;
        host?: string;
        startDate?: string;
        endDate?: string;
        originallyPublishedStartDate?: string;
        originallyPublishedEndDate?: string;
        durationMin?: number;
        durationMax?: number;
        uuids?: string[];
        excludeAlreadyWatched?: boolean;
        countVideos?: boolean;
        autoTagOneOf?: string[];
    }): Promise<ResultList<VideoModel>>;
    static countLives(options: {
        remote: boolean;
        mode: 'published' | 'not-ended';
    }): Promise<number>;
    static countVideosUploadedByUserSince(userId: number, since: Date): Promise<number>;
    static countLivesOfAccount(accountId: number): Promise<number>;
    static load(id: number | string, transaction?: Transaction): Promise<MVideoThumbnail>;
    static loadWithBlacklist(id: number | string, transaction?: Transaction): Promise<MVideoThumbnailBlacklist>;
    static loadAndPopulateAccountAndFiles(id: number | string, transaction?: Transaction): Promise<MVideoAccountLightBlacklistAllFiles>;
    static loadImmutableAttributes(id: number | string, t?: Transaction): Promise<MVideoImmutable>;
    static loadByUrlImmutableAttributes(url: string, transaction?: Transaction): Promise<MVideoImmutable>;
    static loadOnlyId(id: number | string, transaction?: Transaction): Promise<MVideoId>;
    static loadWithFiles(id: number | string, transaction?: Transaction, logging?: boolean): Promise<MVideoWithAllFiles>;
    static loadByUrl(url: string, transaction?: Transaction): Promise<MVideoThumbnail>;
    static loadByUrlWithBlacklist(url: string, transaction?: Transaction): Promise<MVideoThumbnailBlacklist>;
    static loadByUrlAndPopulateAccount(url: string, transaction?: Transaction): Promise<MVideoAccountLight>;
    static loadByUrlAndPopulateAccountAndFiles(url: string, transaction?: Transaction): Promise<MVideoAccountLightBlacklistAllFiles>;
    static loadFull(id: number | string, t?: Transaction, userId?: number): Promise<MVideoFullLight>;
    static loadForGetAPI(parameters: {
        id: number | string;
        transaction?: Transaction;
        userId?: number;
    }): Promise<MVideoDetails>;
    static getStats(): Promise<{
        totalLocalVideos: number;
        totalLocalVideoViews: number;
        totalVideos: number;
    }>;
    static loadByNameAndChannel(channel: MChannelId, name: string): Promise<MVideo>;
    static incrementViews(id: number, views: number): Promise<[affectedRows: VideoModel[], affectedCount?: number]>;
    static updateRatesOf(videoId: number, type: VideoRateType, count: number, t: Transaction): Promise<[undefined, number]>;
    static syncLocalRates(videoId: number, type: VideoRateType, t: Transaction): Promise<[undefined, number]>;
    static checkVideoHasInstanceFollow(videoId: number, followerActorId: number): Promise<boolean>;
    static bulkUpdateSupportField(ofChannel: MChannel, t: Transaction): Promise<[affectedCount: number]>;
    static getAllIdsFromChannel(videoChannel: MChannelId, limit?: number): Promise<number[]>;
    static getRandomFieldSamples(field: 'category' | 'channelId', threshold: number, count: number): Promise<any[]>;
    static buildTrendingQuery(trendingDays: number): {
        attributes: any[];
        subQuery: boolean;
        model: typeof VideoViewModel;
        required: boolean;
        where: {
            startDate: {
                [x: number]: Date;
            };
        };
    };
    private static getAvailableForApi;
    private static throwIfPrivateIncludeWithoutUser;
    private static throwIfPrivacyOneOfWithoutUser;
    private static isPrivateInclude;
    isBlacklisted(): boolean;
    isBlocked(): boolean;
    getMaxQualityAudioAndVideoFiles<T extends MVideoWithFile>(this: T): {
        videoFile: MVideoFileVideo | MVideoFileStreamingPlaylistVideo;
        separatedAudioFile?: undefined;
    } | {
        videoFile: MVideoFileVideo | MVideoFileStreamingPlaylistVideo;
        separatedAudioFile: MVideoFileVideo | MVideoFileStreamingPlaylistVideo;
    };
    getMaxQualityFile<T extends MVideoWithFile>(this: T, streamFilter: VideoFileStreamType): MVideoFileVideo | MVideoFileStreamingPlaylistVideo;
    getMaxQualityBytes<T extends MVideoWithFile>(this: T): number;
    getQualityFileBy<T extends MVideoWithFile>(this: T, streamFilter: VideoFileStreamType, fun: (files: MVideoFile[], property: 'resolution') => MVideoFile): (MVideoFile & {
        Video: T;
    }) | (MVideoFile & {
        VideoStreamingPlaylist: MStreamingPlaylist & {
            VideoFiles: MVideoFile[];
        } & {
            Video: T;
        };
    });
    getMaxFPS(): number;
    getMaxResolution(): number;
    hasAudio(): boolean;
    getWebVideoFileMinResolution<T extends MVideoWithFile>(this: T, resolution: number): MVideoFileVideo;
    hasWebVideoFiles(): boolean;
    addAndSaveThumbnail(thumbnail: MThumbnail, transaction?: Transaction): Promise<void>;
    hasMiniature(this: MVideoThumbnail): boolean;
    getMiniature(this: MVideoThumbnail): MThumbnail;
    hasPreview(this: MVideoThumbnail): boolean;
    getPreview(this: MVideoThumbnail): MThumbnail;
    isOwned(): boolean;
    getWatchStaticPath(): string;
    getEmbedStaticPath(): string;
    getMiniatureStaticPath(): string;
    getPreviewStaticPath(): string;
    toFormattedJSON(this: MVideoFormattable, options?: VideoFormattingJSONOptions): Video;
    toFormattedDetailsJSON(this: MVideoFormattableDetails): VideoDetails;
    getFormattedWebVideoFilesJSON(includeMagnet?: boolean): VideoFile[];
    getFormattedHLSVideoFilesJSON(includeMagnet?: boolean): VideoFile[];
    getFormattedAllVideoFilesJSON(includeMagnet?: boolean): VideoFile[];
    toActivityPubObject(this: MVideoAP): Promise<VideoObject>;
    lightAPToFullAP(this: MVideoAPLight, transaction: Transaction): Promise<MVideoAP>;
    getTruncatedDescription(): string;
    getAllFiles(): MVideoFile[];
    getDescriptionAPIPath(): string;
    getHLSPlaylist(): MStreamingPlaylistFilesVideo;
    setHLSPlaylist(playlist: MStreamingPlaylist): void;
    removeWebVideoFile(videoFile: MVideoFile, isRedundancy?: boolean): Promise<any[]>;
    removeStreamingPlaylistFiles(streamingPlaylist: MStreamingPlaylist, isRedundancy?: boolean): Promise<void>;
    removeStreamingPlaylistVideoFile(streamingPlaylist: MStreamingPlaylist, videoFile: MVideoFile): Promise<void>;
    removeStreamingPlaylistFile(streamingPlaylist: MStreamingPlaylist, filename: string): Promise<void>;
    removeOriginalFile(videoSource: MVideoSource): Promise<void>;
    isOutdated(): boolean;
    setAsRefreshed(transaction?: Transaction): Promise<void>;
    requiresUserAuth(options: {
        urlParamId: string;
        checkBlacklist: boolean;
    }): boolean;
    hasPrivateStaticPath(): boolean;
    setNewState(newState: VideoStateType, isNewVideo: boolean, transaction: Transaction): Promise<void>;
    getBandwidthBits(this: MVideo, videoFile: MVideoFile): number;
    getTrackerUrls(): string[];
}
//# sourceMappingURL=video.d.ts.map