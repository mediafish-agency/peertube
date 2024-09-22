import { AbstractScheduler } from './abstract-scheduler.js';
export declare class RunnerJobWatchDogScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=runner-job-watch-dog-scheduler.d.ts.map