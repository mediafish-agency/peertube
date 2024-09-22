import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class DebugCommand extends AbstractCommand {
    getDebug(options = {}) {
        const path = '/api/v1/server/debug';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    sendCommand(options) {
        const { body } = options;
        const path = '/api/v1/server/debug/run-command';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: body, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=debug-command.js.map