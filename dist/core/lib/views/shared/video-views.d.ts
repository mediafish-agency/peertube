import { MVideo, MVideoImmutable } from '../../../types/models/index.js';
export declare class VideoViews {
    private readonly viewsCache;
    addLocalView(options: {
        video: MVideoImmutable;
        sessionId: string;
        watchTime: number;
    }): Promise<boolean>;
    addRemoteView(options: {
        video: MVideo;
    }): Promise<boolean>;
    private addView;
    private hasEnoughWatchTime;
    private doesVideoSessionIdViewExist;
    private setSessionIdVideoView;
}
//# sourceMappingURL=video-views.d.ts.map