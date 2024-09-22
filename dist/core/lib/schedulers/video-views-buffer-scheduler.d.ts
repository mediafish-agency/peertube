import { AbstractScheduler } from './abstract-scheduler.js';
export declare class VideoViewsBufferScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=video-views-buffer-scheduler.d.ts.map