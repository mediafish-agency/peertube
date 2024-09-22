import { Meter } from '@opentelemetry/api';
import { MVideoImmutable } from '../../../types/models/index.js';
import { PlaybackMetricCreate } from '@peertube/peertube-models';
export declare class PlaybackMetrics {
    private readonly meter;
    private errorsCounter;
    private resolutionChangesCounter;
    private bufferStalledCounter;
    private downloadedBytesP2PCounter;
    private uploadedBytesP2PCounter;
    private downloadedBytesHTTPCounter;
    private peersP2PPeersGaugeBuffer;
    constructor(meter: Meter);
    buildCounters(): void;
    observe(video: MVideoImmutable, metrics: PlaybackMetricCreate): void;
}
//# sourceMappingURL=playback-metrics.d.ts.map