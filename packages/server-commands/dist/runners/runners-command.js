import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { buildUUID } from '@peertube/peertube-node-utils';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class RunnersCommand extends AbstractCommand {
    list(options = {}) {
        const path = '/api/v1/runners';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    register(options) {
        const path = '/api/v1/runners/register';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['name', 'registrationToken', 'description']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    unregister(options) {
        const path = '/api/v1/runners/unregister';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['runnerToken']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    delete(options) {
        const path = '/api/v1/runners/' + options.id;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async autoRegisterRunner() {
        const { data } = await this.server.runnerRegistrationTokens.list({ sort: 'createdAt' });
        const { runnerToken } = await this.register({
            name: 'runner ' + buildUUID(),
            registrationToken: data[0].registrationToken
        });
        return runnerToken;
    }
}
//# sourceMappingURL=runners-command.js.map