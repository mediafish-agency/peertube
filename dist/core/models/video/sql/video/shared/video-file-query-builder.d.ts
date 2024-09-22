import { Sequelize, Transaction } from 'sequelize';
import { AbstractVideoQueryBuilder } from './abstract-video-query-builder.js';
export type FileQueryOptions = {
    id?: string | number;
    url?: string;
    includeRedundancy: boolean;
    transaction?: Transaction;
    logging?: boolean;
};
export declare class VideoFileQueryBuilder extends AbstractVideoQueryBuilder {
    protected readonly sequelize: Sequelize;
    protected attributes: {
        [key: string]: string;
    };
    constructor(sequelize: Sequelize);
    queryWebVideos(options: FileQueryOptions): Promise<any[]>;
    queryStreamingPlaylistVideos(options: FileQueryOptions): Promise<any[]>;
    private buildWebVideoFilesQuery;
    private buildVideoStreamingPlaylistFilesQuery;
    private buildQuery;
}
//# sourceMappingURL=video-file-query-builder.d.ts.map