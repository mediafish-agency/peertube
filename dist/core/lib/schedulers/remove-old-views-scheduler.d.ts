import { AbstractScheduler } from './abstract-scheduler.js';
export declare class RemoveOldViewsScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<number>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=remove-old-views-scheduler.d.ts.map