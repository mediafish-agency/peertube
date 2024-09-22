import { LiveVideoErrorType } from '@peertube/peertube-models';
declare class LiveManager {
    private static instance;
    private readonly muxingSessions;
    private readonly videoSessions;
    private rtmpServer;
    private rtmpsServer;
    private running;
    private constructor();
    init(): void;
    run(): Promise<void>;
    stop(): void;
    isRunning(): boolean;
    hasSession(sessionId: string): any;
    stopSessionOfVideo(options: {
        videoUUID: string;
        error: LiveVideoErrorType | null;
        expectedSessionId?: string;
        errorOnReplay?: boolean;
    }): void;
    private getContext;
    private abortSession;
    private handleSession;
    private runMuxingSession;
    private publishAndFederateLive;
    private onMuxingFFmpegEnd;
    private onAfterMuxingCleanup;
    private handleBrokenLives;
    private findReplayDirectory;
    private buildAllResolutionsToTranscode;
    private saveStartingSession;
    private saveEndingSession;
    static get Instance(): LiveManager;
}
export { LiveManager };
//# sourceMappingURL=live-manager.d.ts.map