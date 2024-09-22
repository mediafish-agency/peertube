import { VideoImport, type VideoImportStateType } from '@peertube/peertube-models';
import { MVideoImportDefault, MVideoImportFormattable } from '../../types/models/video/video-import.js';
import { SequelizeModel } from '../shared/index.js';
import { UserModel } from '../user/user.js';
import { VideoChannelSyncModel } from './video-channel-sync.js';
import { VideoModel } from './video.js';
export declare class VideoImportModel extends SequelizeModel<VideoImportModel> {
    createdAt: Date;
    updatedAt: Date;
    targetUrl: string;
    magnetUri: string;
    torrentName: string;
    state: VideoImportStateType;
    error: string;
    userId: number;
    User: Awaited<UserModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
    videoChannelSyncId: number;
    VideoChannelSync: Awaited<VideoChannelSyncModel>;
    static deleteVideoIfFailed(instance: VideoImportModel, options: any): any;
    static loadAndPopulateVideo(id: number): Promise<MVideoImportDefault>;
    static listUserVideoImportsForApi(options: {
        userId: number;
        start: number;
        count: number;
        sort: string;
        search?: string;
        targetUrl?: string;
        videoChannelSyncId?: number;
    }): Promise<{
        total: number;
        data: MVideoImportDefault[];
    }>;
    static urlAlreadyImported(channelId: number, targetUrl: string): Promise<boolean>;
    getTargetIdentifier(): string;
    toFormattedJSON(this: MVideoImportFormattable): VideoImport;
    private static getStateLabel;
}
//# sourceMappingURL=video-import.d.ts.map