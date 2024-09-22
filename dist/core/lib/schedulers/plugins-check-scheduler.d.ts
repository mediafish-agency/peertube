import { AbstractScheduler } from './abstract-scheduler.js';
export declare class PluginsCheckScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    private checkLatestPluginsVersion;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=plugins-check-scheduler.d.ts.map