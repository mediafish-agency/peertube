import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class VideoStatsCommand extends AbstractCommand {
    getOverallStats(options) {
        const path = '/api/v1/videos/' + options.videoId + '/stats/overall';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['startDate', 'endDate']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getTimeserieStats(options) {
        const path = '/api/v1/videos/' + options.videoId + '/stats/timeseries/' + options.metric;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['startDate', 'endDate']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getRetentionStats(options) {
        const path = '/api/v1/videos/' + options.videoId + '/stats/retention';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=video-stats-command.js.map