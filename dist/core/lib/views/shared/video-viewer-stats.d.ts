import { VideoViewEvent } from '@peertube/peertube-models';
import { MVideoImmutable } from '../../../types/models/index.js';
export declare class VideoViewerStats {
    private processingViewersStats;
    private processingRedisWrites;
    private readonly viewerCache;
    private readonly redisPendingWrites;
    constructor();
    addLocalViewer(options: {
        video: MVideoImmutable;
        currentTime: number;
        ip: string;
        sessionId: string;
        viewEvent?: VideoViewEvent;
    }): Promise<void>;
    getWatchTime(videoId: number, sessionId: string): Promise<number>;
    processViewerStats(): Promise<void>;
    private saveViewerStats;
    private buildWatchTimeFromSections;
    private getLocalVideoViewer;
    private getLocalVideoViewerByKey;
    private setLocalVideoViewer;
    private deleteLocalVideoViewersKeys;
    private syncRedisWrites;
}
//# sourceMappingURL=video-viewer-stats.d.ts.map