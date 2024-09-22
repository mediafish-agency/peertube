import { PlaylistObject, VideoPlaylist, type VideoPlaylistPrivacyType, type VideoPlaylistType_Type } from '@peertube/peertube-models';
import { MAccountId, MChannelId, MVideoPlaylistElement } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { MThumbnail } from '../../types/models/video/thumbnail.js';
import { MVideoPlaylist, MVideoPlaylistAP, MVideoPlaylistAccountThumbnail, MVideoPlaylistFormattable, MVideoPlaylistFull, MVideoPlaylistFullSummary, MVideoPlaylistSummaryWithElements } from '../../types/models/video/video-playlist.js';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { ThumbnailModel } from './thumbnail.js';
import { VideoChannelModel } from './video-channel.js';
import { VideoPlaylistElementModel } from './video-playlist-element.js';
type AvailableForListOptions = {
    followerActorId?: number;
    type?: VideoPlaylistType_Type;
    accountId?: number;
    videoChannelId?: number;
    listMyPlaylists?: boolean;
    search?: string;
    host?: string;
    uuids?: string[];
    withVideos?: boolean;
    forCount?: boolean;
};
export declare class VideoPlaylistModel extends SequelizeModel<VideoPlaylistModel> {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    privacy: VideoPlaylistPrivacyType;
    url: string;
    uuid: string;
    type: VideoPlaylistType_Type;
    ownerAccountId: number;
    OwnerAccount: Awaited<AccountModel>;
    videoChannelId: number;
    VideoChannel: Awaited<VideoChannelModel>;
    VideoPlaylistElements: Awaited<VideoPlaylistElementModel>[];
    Thumbnail: Awaited<ThumbnailModel>;
    static listForApi(options: AvailableForListOptions & {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: VideoPlaylistModel[];
    }>;
    static searchForApi(options: Pick<AvailableForListOptions, 'followerActorId' | 'search' | 'host' | 'uuids'> & {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: VideoPlaylistModel[];
    }>;
    static listPublicUrlsOfForAP(options: {
        account?: MAccountId;
        channel?: MChannelId;
    }, start: number, count: number): Promise<{
        total: number;
        data: string[];
    }>;
    static listPlaylistSummariesOf(accountId: number, videoIds: number[]): Promise<MVideoPlaylistSummaryWithElements[]>;
    static listPlaylistForExport(accountId: number): Promise<MVideoPlaylistFull[]>;
    static doesPlaylistExist(url: string): Promise<boolean>;
    static loadWithAccountAndChannelSummary(id: number | string, transaction: Transaction): Promise<MVideoPlaylistFullSummary>;
    static loadWithAccountAndChannel(id: number | string, transaction: Transaction): Promise<MVideoPlaylistFull>;
    static loadByUrlAndPopulateAccount(url: string): Promise<MVideoPlaylistAccountThumbnail>;
    static loadByUrlWithAccountAndChannelSummary(url: string): Promise<MVideoPlaylistFullSummary>;
    static loadWatchLaterOf(account: MAccountId): Promise<MVideoPlaylistFull>;
    static loadRegularByAccountAndName(account: MAccountId, name: string): Promise<MVideoPlaylist>;
    static getPrivacyLabel(privacy: VideoPlaylistPrivacyType): string;
    static getTypeLabel(type: VideoPlaylistType_Type): string;
    static resetPlaylistsOfChannel(videoChannelId: number, transaction: Transaction): Promise<[affectedCount: number]>;
    setAndSaveThumbnail(thumbnail: MThumbnail, t: Transaction): Promise<void>;
    hasThumbnail(): boolean;
    hasGeneratedThumbnail(): boolean;
    shouldGenerateThumbnailWithNewElement(newElement: MVideoPlaylistElement): boolean;
    generateThumbnailName(): string;
    getThumbnailUrl(): string;
    getThumbnailStaticPath(): string;
    getWatchStaticPath(): string;
    getEmbedStaticPath(): string;
    static getStats(): Promise<{
        totalLocalPlaylists: number;
    }>;
    setAsRefreshed(): Promise<void>;
    setVideosLength(videosLength: number): void;
    isOwned(): boolean;
    isOutdated(): boolean;
    toFormattedJSON(this: MVideoPlaylistFormattable): VideoPlaylist;
    toActivityPubObject(this: MVideoPlaylistAP, page: number, t: Transaction): Promise<PlaylistObject>;
}
export {};
//# sourceMappingURL=video-playlist.d.ts.map