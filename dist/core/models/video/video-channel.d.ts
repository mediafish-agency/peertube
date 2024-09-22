import { ActivityPubActor, VideoChannel, VideoChannelSummary } from '@peertube/peertube-models';
import { MAccountHost } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { MChannelAP, MChannelBannerAccountDefault, MChannelDefault, MChannelFormattable, MChannelHost, MChannelSummaryFormattable, type MChannel } from '../../types/models/video/index.js';
import { AccountModel } from '../account/account.js';
import { ActorModel } from '../actor/actor.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoPlaylistModel } from './video-playlist.js';
import { VideoModel } from './video.js';
export declare enum ScopeNames {
    FOR_API = "FOR_API",
    SUMMARY = "SUMMARY",
    WITH_ACCOUNT = "WITH_ACCOUNT",
    WITH_ACTOR = "WITH_ACTOR",
    WITH_ACTOR_BANNER = "WITH_ACTOR_BANNER",
    WITH_VIDEOS = "WITH_VIDEOS",
    WITH_STATS = "WITH_STATS"
}
type AvailableForListOptions = {
    actorId: number;
    search?: string;
    host?: string;
    handles?: string[];
    forCount?: boolean;
};
export type SummaryOptions = {
    actorRequired?: boolean;
    withAccount?: boolean;
    withAccountBlockerIds?: number[];
};
export declare class VideoChannelModel extends SequelizeModel<VideoChannelModel> {
    name: string;
    description: string;
    support: string;
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    Actor: Awaited<ActorModel>;
    accountId: number;
    Account: Awaited<AccountModel>;
    Videos: Awaited<VideoModel>[];
    VideoPlaylists: Awaited<VideoPlaylistModel>[];
    static notifyCreate(channel: MChannel): void;
    static notifyUpdate(channel: MChannel): void;
    static notifyDestroy(channel: MChannel): void;
    static sendDeleteIfOwned(instance: VideoChannelModel, options: any): Promise<any>;
    static deleteActorIfRemote(instance: VideoChannelModel, options: any): Promise<void>;
    static countByAccount(accountId: number): Promise<number>;
    static getStats(): Promise<{
        totalLocalVideoChannels: number;
        totalLocalDailyActiveVideoChannels: number;
        totalLocalWeeklyActiveVideoChannels: number;
        totalLocalMonthlyActiveVideoChannels: number;
        totalLocalHalfYearActiveVideoChannels: number;
    }>;
    static listLocalsForSitemap(sort: string): Promise<MChannelHost[]>;
    static listForApi(parameters: Pick<AvailableForListOptions, 'actorId'> & {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: VideoChannelModel[];
    }>;
    static searchForApi(options: Pick<AvailableForListOptions, 'actorId' | 'search' | 'host' | 'handles'> & {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: VideoChannelModel[];
    }>;
    static listByAccountForAPI(options: {
        accountId: number;
        start: number;
        count: number;
        sort: string;
        withStats?: boolean;
        search?: string;
    }): Promise<{
        total: number;
        data: VideoChannelModel[];
    }>;
    static listAllByAccount(accountId: number): Promise<MChannelDefault[]>;
    static loadAndPopulateAccount(id: number, transaction?: Transaction): Promise<MChannelBannerAccountDefault>;
    static loadByUrlAndPopulateAccount(url: string): Promise<MChannelBannerAccountDefault>;
    static loadByNameWithHostAndPopulateAccount(nameWithHost: string): Promise<MChannelBannerAccountDefault>;
    static loadLocalByNameAndPopulateAccount(name: string): Promise<MChannelBannerAccountDefault>;
    static loadByNameAndHostAndPopulateAccount(name: string, host: string): Promise<MChannelBannerAccountDefault>;
    toFormattedSummaryJSON(this: MChannelSummaryFormattable): VideoChannelSummary;
    toFormattedJSON(this: MChannelFormattable): VideoChannel;
    toActivityPubObject(this: MChannelAP): Promise<ActivityPubActor>;
    getClientUrl(this: MAccountHost | MChannelHost): string;
    getDisplayName(): string;
    isOutdated(): boolean;
    setAsUpdated(transaction?: Transaction): Promise<void>;
}
export {};
//# sourceMappingURL=video-channel.d.ts.map