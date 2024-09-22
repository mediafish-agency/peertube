import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class StatsCommand extends AbstractCommand {
    get(options = {}) {
        const { useCache = false } = options;
        const path = '/api/v1/server/stats';
        const query = {
            t: useCache ? undefined : new Date().getTime()
        };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=stats-command.js.map