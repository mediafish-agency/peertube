import { ResultList, VideoChannelSync, VideoChannelSyncCreate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ChannelSyncsCommand extends AbstractCommand {
    private static readonly API_PATH;
    listByAccount(options: OverrideCommandOptions & {
        accountName: string;
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<VideoChannelSync>>;
    create(options: OverrideCommandOptions & {
        attributes: VideoChannelSyncCreate;
    }): Promise<{
        videoChannelSync: VideoChannelSync;
    }>;
    delete(options: OverrideCommandOptions & {
        channelSyncId: number;
    }): import("supertest").Test;
}
//# sourceMappingURL=channel-syncs-command.d.ts.map