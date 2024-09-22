import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class RegistrationsCommand extends AbstractCommand {
    register(options) {
        const { password = 'password', email = options.username + '@example.com' } = options;
        const path = '/api/v1/users/register';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: Object.assign(Object.assign({}, pick(options, ['username', 'displayName', 'channel'])), { password,
                email }), implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    requestRegistration(options) {
        const { password = 'password', email = options.username + '@example.com' } = options;
        const path = '/api/v1/users/registrations/request';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: Object.assign(Object.assign({}, pick(options, ['username', 'displayName', 'channel', 'registrationReason'])), { password,
                email }), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    accept(options) {
        const { id } = options;
        const path = '/api/v1/users/registrations/' + id + '/accept';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['moderationResponse', 'preventEmailDelivery']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    reject(options) {
        const { id } = options;
        const path = '/api/v1/users/registrations/' + id + '/reject';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['moderationResponse', 'preventEmailDelivery']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    delete(options) {
        const { id } = options;
        const path = '/api/v1/users/registrations/' + id;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options = {}) {
        const path = '/api/v1/users/registrations';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort', 'search']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    askSendVerifyEmail(options) {
        const { email } = options;
        const path = '/api/v1/users/registrations/ask-send-verify-email';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { email }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    verifyEmail(options) {
        const { registrationId, verificationString } = options;
        const path = '/api/v1/users/registrations/' + registrationId + '/verify-email';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                verificationString
            }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=registrations-command.js.map