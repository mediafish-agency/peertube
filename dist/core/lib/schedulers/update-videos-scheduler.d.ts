import { AbstractScheduler } from './abstract-scheduler.js';
export declare class UpdateVideosScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<any>;
    private updateVideos;
    private updateAVideo;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=update-videos-scheduler.d.ts.map