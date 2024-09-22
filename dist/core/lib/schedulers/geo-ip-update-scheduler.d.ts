import { AbstractScheduler } from './abstract-scheduler.js';
export declare class GeoIPUpdateScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=geo-ip-update-scheduler.d.ts.map