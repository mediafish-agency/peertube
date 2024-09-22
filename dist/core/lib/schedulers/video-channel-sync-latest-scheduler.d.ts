import { AbstractScheduler } from './abstract-scheduler.js';
export declare class VideoChannelSyncLatestScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=video-channel-sync-latest-scheduler.d.ts.map