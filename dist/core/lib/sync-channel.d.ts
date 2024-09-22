import { MChannelAccountDefault, MChannelSync } from '../types/models/index.js';
export declare function synchronizeChannel(options: {
    channel: MChannelAccountDefault;
    externalChannelUrl: string;
    videosCountLimit: number;
    channelSync?: MChannelSync;
    onlyAfter?: Date;
}): Promise<void>;
//# sourceMappingURL=sync-channel.d.ts.map