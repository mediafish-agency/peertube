import { PlaybackMetricCreate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class MetricsCommand extends AbstractCommand {
    addPlaybackMetric(options: OverrideCommandOptions & {
        metrics: PlaybackMetricCreate;
    }): import("supertest").Test;
}
//# sourceMappingURL=metrics-command.d.ts.map