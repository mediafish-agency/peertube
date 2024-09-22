import { AbstractScheduler } from './abstract-scheduler.js';
export declare class RemoveDanglingResumableUploadsScheduler extends AbstractScheduler {
    private static instance;
    private lastExecutionTimeMs;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=remove-dangling-resumable-uploads-scheduler.d.ts.map