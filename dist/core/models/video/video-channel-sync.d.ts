import { VideoChannelSync, type VideoChannelSyncStateType } from '@peertube/peertube-models';
import { MChannelSync, MChannelSyncChannel, MChannelSyncFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoChannelModel } from './video-channel.js';
export declare class VideoChannelSyncModel extends SequelizeModel<VideoChannelSyncModel> {
    externalChannelUrl: string;
    state: VideoChannelSyncStateType;
    lastSyncAt: Date;
    createdAt: Date;
    updatedAt: Date;
    videoChannelId: number;
    VideoChannel: Awaited<VideoChannelModel>;
    static listByAccountForAPI(options: {
        accountId: number;
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: VideoChannelSyncModel[];
    }>;
    static countByAccount(accountId: number): Promise<number>;
    static loadWithChannel(id: number): Promise<MChannelSyncChannel>;
    static listSyncs(): Promise<MChannelSync[]>;
    toFormattedJSON(this: MChannelSyncFormattable): VideoChannelSync;
}
//# sourceMappingURL=video-channel-sync.d.ts.map