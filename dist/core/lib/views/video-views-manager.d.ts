import { VideoViewEvent } from '@peertube/peertube-models';
import { MVideo, MVideoImmutable } from '../../types/models/index.js';
import { VideoScope, ViewerScope } from './shared/index.js';
export declare class VideoViewsManager {
    private static instance;
    private videoViewerStats;
    private videoViewerCounters;
    private videoViews;
    private constructor();
    init(): void;
    processLocalView(options: {
        video: MVideoImmutable;
        currentTime: number;
        ip: string | null;
        sessionId?: string;
        viewEvent?: VideoViewEvent;
    }): Promise<{
        successView: boolean;
        successViewer: boolean;
    }>;
    processRemoteView(options: {
        video: MVideo;
        viewerId: string | null;
        viewerExpires?: Date;
        viewerResultCounter?: number;
    }): Promise<void>;
    getTotalViewersOf(video: MVideo): number;
    getTotalViewers(options: {
        viewerScope: ViewerScope;
        videoScope: VideoScope;
    }): number;
    buildViewerExpireTime(): number;
    processViewerStats(): Promise<void>;
    static get Instance(): VideoViewsManager;
}
//# sourceMappingURL=video-views-manager.d.ts.map