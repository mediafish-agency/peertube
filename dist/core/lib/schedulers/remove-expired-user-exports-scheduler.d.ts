import { AbstractScheduler } from './abstract-scheduler.js';
export declare class RemoveExpiredUserExportsScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=remove-expired-user-exports-scheduler.d.ts.map