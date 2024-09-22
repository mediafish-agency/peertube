import { AbstractScheduler } from './abstract-scheduler.js';
export declare class VideosRedundancyScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    createManualRedundancy(videoId: number): Promise<void>;
    protected internalExecute(): Promise<void>;
    static get Instance(): VideosRedundancyScheduler;
    private extendsLocalExpiration;
    private extendsRedundancy;
    private purgeRemoteExpired;
    private findVideoToDuplicate;
    private createVideoRedundancies;
    private createVideoFileRedundancy;
    private createStreamingPlaylistRedundancy;
    private extendsExpirationOf;
    private purgeCacheIfNeeded;
    private isTooHeavy;
    private buildNewExpiration;
    private buildEntryLogId;
    private getTotalFileSizes;
    private loadAndRefreshVideo;
}
//# sourceMappingURL=videos-redundancy-scheduler.d.ts.map