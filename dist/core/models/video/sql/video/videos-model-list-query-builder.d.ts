import { Sequelize } from 'sequelize';
import { AbstractVideoQueryBuilder } from './shared/abstract-video-query-builder.js';
import { VideoFileQueryBuilder } from './shared/video-file-query-builder.js';
import { BuildVideosListQueryOptions } from './videos-id-list-query-builder.js';
export declare class VideosModelListQueryBuilder extends AbstractVideoQueryBuilder {
    protected readonly sequelize: Sequelize;
    protected attributes: {
        [key: string]: string;
    };
    private innerQuery;
    private innerSort;
    webVideoFilesQueryBuilder: VideoFileQueryBuilder;
    streamingPlaylistFilesQueryBuilder: VideoFileQueryBuilder;
    private readonly videoModelBuilder;
    constructor(sequelize: Sequelize);
    queryVideos(options: BuildVideosListQueryOptions): Promise<import("../../video.js").VideoModel[]>;
    private buildInnerQuery;
    private buildMainQuery;
}
//# sourceMappingURL=videos-model-list-query-builder.d.ts.map