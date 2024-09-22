import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class MetricsCommand extends AbstractCommand {
    addPlaybackMetric(options) {
        const path = '/api/v1/metrics/playback';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.metrics, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=metrics-command.js.map