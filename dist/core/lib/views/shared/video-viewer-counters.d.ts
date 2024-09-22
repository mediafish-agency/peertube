import { MVideo, MVideoImmutable } from '../../../types/models/index.js';
export type ViewerScope = 'local' | 'remote';
export type VideoScope = 'local' | 'remote';
export declare class VideoViewerCounters {
    private readonly viewersPerVideo;
    private readonly idToViewer;
    private processingViewerCounters;
    constructor();
    addLocalViewer(options: {
        video: MVideoImmutable;
        sessionId: string;
    }): Promise<boolean>;
    addRemoteViewerOnLocalVideo(options: {
        video: MVideo;
        viewerId: string;
        viewerExpires: Date;
    }): boolean;
    addRemoteViewerOnRemoteVideo(options: {
        video: MVideo;
        viewerId: string;
        viewerExpires: Date;
        viewerResultCounter?: number;
    }): boolean;
    getTotalViewers(options: {
        viewerScope: ViewerScope;
        videoScope: VideoScope;
    }): number;
    getTotalViewersOf(video: MVideoImmutable): number;
    buildViewerExpireTime(): number;
    private addViewerToVideo;
    private updateVideoViewersCount;
    private notifyClients;
    private federateViewerIfNeeded;
    private federateTotalViewers;
}
//# sourceMappingURL=video-viewer-counters.d.ts.map