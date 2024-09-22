import { AbstractScheduler } from './abstract-scheduler.js';
export declare class YoutubeDlUpdateScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=youtube-dl-update-scheduler.d.ts.map