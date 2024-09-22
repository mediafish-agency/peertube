import { AbstractScheduler } from './abstract-scheduler.js';
export declare class PeerTubeVersionCheckScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    private checkLatestVersion;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=peertube-version-check-scheduler.d.ts.map