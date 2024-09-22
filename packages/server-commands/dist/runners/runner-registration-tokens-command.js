import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class RunnerRegistrationTokensCommand extends AbstractCommand {
    list(options = {}) {
        const path = '/api/v1/runners/registration-tokens';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    generate(options = {}) {
        const path = '/api/v1/runners/registration-tokens/generate';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    delete(options) {
        const path = '/api/v1/runners/registration-tokens/' + options.id;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async getFirstRegistrationToken(options = {}) {
        const { data } = await this.list(options);
        return data[0].registrationToken;
    }
}
//# sourceMappingURL=runner-registration-tokens-command.js.map