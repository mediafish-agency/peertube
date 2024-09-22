import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class LogsCommand extends AbstractCommand {
    createLogClient(options) {
        const path = '/api/v1/server/logs/client';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.payload, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getLogs(options) {
        const { startDate, endDate, tagsOneOf, level } = options;
        const path = '/api/v1/server/logs';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { startDate, endDate, level, tagsOneOf }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getAuditLogs(options) {
        const { startDate, endDate } = options;
        const path = '/api/v1/server/audit-logs';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { startDate, endDate }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=logs-command.js.map