import { CacheFileObject, VideoRedundanciesTarget, VideoRedundancy, VideoRedundancyStrategy, VideoRedundancyStrategyWithManual } from '@peertube/peertube-models';
import { MVideoForRedundancyAPI, MVideoRedundancy, MVideoRedundancyAP, MVideoRedundancyVideo } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { ActorModel } from '../actor/actor.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoFileModel } from '../video/video-file.js';
import { VideoStreamingPlaylistModel } from '../video/video-streaming-playlist.js';
import { VideoModel } from '../video/video.js';
export declare enum ScopeNames {
    WITH_VIDEO = "WITH_VIDEO"
}
export declare class VideoRedundancyModel extends SequelizeModel<VideoRedundancyModel> {
    createdAt: Date;
    updatedAt: Date;
    expiresOn: Date;
    fileUrl: string;
    url: string;
    strategy: string;
    videoFileId: number;
    VideoFile: Awaited<VideoFileModel>;
    videoStreamingPlaylistId: number;
    VideoStreamingPlaylist: Awaited<VideoStreamingPlaylistModel>;
    actorId: number;
    Actor: Awaited<ActorModel>;
    static removeFile(instance: VideoRedundancyModel): Promise<any>;
    static loadLocalByFileId(videoFileId: number): Promise<MVideoRedundancyVideo>;
    static listLocalByVideoId(videoId: number): Promise<MVideoRedundancyVideo[]>;
    static loadLocalByStreamingPlaylistId(videoStreamingPlaylistId: number): Promise<MVideoRedundancyVideo>;
    static loadByIdWithVideo(id: number, transaction?: Transaction): Promise<MVideoRedundancyVideo>;
    static loadByUrl(url: string, transaction?: Transaction): Promise<MVideoRedundancy>;
    static isLocalByVideoUUIDExists(uuid: string): Promise<boolean>;
    static getVideoSample(p: Promise<VideoModel[]>): Promise<import("../../types/models/index.js").MVideoWithAllFiles>;
    static findMostViewToDuplicate(randomizedFactor: number): Promise<import("../../types/models/index.js").MVideoWithAllFiles>;
    static findTrendingToDuplicate(randomizedFactor: number): Promise<import("../../types/models/index.js").MVideoWithAllFiles>;
    static findRecentlyAddedToDuplicate(randomizedFactor: number, minViews: number): Promise<import("../../types/models/index.js").MVideoWithAllFiles>;
    static loadOldestLocalExpired(strategy: VideoRedundancyStrategy, expiresAfterMs: number): Promise<MVideoRedundancyVideo>;
    static listLocalExpired(): Promise<MVideoRedundancyVideo[]>;
    static listRemoteExpired(): Promise<VideoRedundancyModel[]>;
    static listLocalOfServer(serverId: number): Promise<VideoRedundancyModel[]>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
        target: VideoRedundanciesTarget;
        strategy?: string;
    }): Promise<{
        total: number;
        data: VideoModel[];
    }>;
    static getStats(strategy: VideoRedundancyStrategyWithManual): Promise<{
        totalUsed: number;
        totalVideos: any;
        totalVideoFiles: any;
    }>;
    static toFormattedJSONStatic(video: MVideoForRedundancyAPI): VideoRedundancy;
    getVideo(): VideoModel;
    getVideoUUID(): string;
    isOwned(): boolean;
    toActivityPubObject(this: MVideoRedundancyAP): CacheFileObject;
    private static buildVideoIdsForDuplication;
    private static buildServerRedundancyInclude;
}
//# sourceMappingURL=video-redundancy.d.ts.map