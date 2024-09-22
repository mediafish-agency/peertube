import { Sequelize, Transaction } from 'sequelize';
import { AbstractVideoQueryBuilder } from './shared/abstract-video-query-builder.js';
import { VideoFileQueryBuilder } from './shared/video-file-query-builder.js';
export type GetType = 'api' | 'full' | 'account-blacklist-files' | 'account' | 'all-files' | 'thumbnails' | 'thumbnails-blacklist' | 'id' | 'blacklist-rights';
export type BuildVideoGetQueryOptions = {
    id?: number | string;
    url?: string;
    type: GetType;
    userId?: number;
    transaction?: Transaction;
    logging?: boolean;
};
export declare class VideoModelGetQueryBuilder {
    protected readonly sequelize: Sequelize;
    videoQueryBuilder: VideosModelGetQuerySubBuilder;
    webVideoFilesQueryBuilder: VideoFileQueryBuilder;
    streamingPlaylistFilesQueryBuilder: VideoFileQueryBuilder;
    private readonly videoModelBuilder;
    private static readonly videoFilesInclude;
    constructor(sequelize: Sequelize);
    queryVideo(options: BuildVideoGetQueryOptions): Promise<import("../../video.js").VideoModel>;
    private shouldIncludeRedundancies;
}
export declare class VideosModelGetQuerySubBuilder extends AbstractVideoQueryBuilder {
    protected readonly sequelize: Sequelize;
    protected attributes: {
        [key: string]: string;
    };
    protected webVideoFilesQuery: string;
    protected streamingPlaylistFilesQuery: string;
    private static readonly trackersInclude;
    private static readonly liveInclude;
    private static readonly scheduleUpdateInclude;
    private static readonly tagsInclude;
    private static readonly userHistoryInclude;
    private static readonly accountInclude;
    private static readonly ownerUserInclude;
    private static readonly blacklistedInclude;
    private static readonly thumbnailsInclude;
    constructor(sequelize: Sequelize);
    queryVideos(options: BuildVideoGetQueryOptions): Promise<any[]>;
    private buildMainGetQuery;
    private buildQuery;
}
//# sourceMappingURL=video-model-get-query-builder.d.ts.map