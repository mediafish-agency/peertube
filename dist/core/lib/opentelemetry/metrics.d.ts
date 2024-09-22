import { Application } from 'express';
import { MVideoImmutable } from '../../types/models/index.js';
import { PlaybackMetricCreate } from '@peertube/peertube-models';
declare class OpenTelemetryMetrics {
    private static instance;
    private meter;
    private onRequestDuration;
    private playbackMetrics;
    private constructor();
    init(app: Application): void;
    registerMetrics(options: {
        trackerServer: any;
    }): void;
    observePlaybackMetric(video: MVideoImmutable, metrics: PlaybackMetricCreate): void;
    private buildRequestObserver;
    private buildRequestPath;
    static get Instance(): OpenTelemetryMetrics;
}
export { OpenTelemetryMetrics };
//# sourceMappingURL=metrics.d.ts.map