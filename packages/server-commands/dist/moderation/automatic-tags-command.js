import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class AutomaticTagsCommand extends AbstractCommand {
    getCommentPolicies(options) {
        const path = '/api/v1/automatic-tags/policies/accounts/' + options.accountName + '/comments';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    updateCommentPolicies(options) {
        const path = '/api/v1/automatic-tags/policies/accounts/' + options.accountName + '/comments';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['review']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getAccountAvailable(options) {
        const path = '/api/v1/automatic-tags/accounts/' + options.accountName + '/available';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getServerAvailable(options = {}) {
        const path = '/api/v1/automatic-tags/server/available';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=automatic-tags-command.js.map