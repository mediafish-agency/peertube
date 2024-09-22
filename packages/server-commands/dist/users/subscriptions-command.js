import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class SubscriptionsCommand extends AbstractCommand {
    add(options) {
        const path = '/api/v1/users/me/subscriptions';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { uri: options.targetUri }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options = {}) {
        const { sort = '-createdAt', search } = options;
        const path = '/api/v1/users/me/subscriptions';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                sort,
                search
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    get(options) {
        const path = '/api/v1/users/me/subscriptions/' + options.uri;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    remove(options) {
        const path = '/api/v1/users/me/subscriptions/' + options.uri;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    exist(options) {
        const path = '/api/v1/users/me/subscriptions/exist';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { 'uris[]': options.uris }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=subscriptions-command.js.map