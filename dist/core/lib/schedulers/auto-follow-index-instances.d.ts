import { AbstractScheduler } from './abstract-scheduler.js';
export declare class AutoFollowIndexInstances extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private lastCheck;
    private constructor();
    protected internalExecute(): Promise<void>;
    private autoFollow;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=auto-follow-index-instances.d.ts.map