import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/requests.js';
import { AbstractCommand } from '../shared/index.js';
export class AbusesCommand extends AbstractCommand {
    report(options) {
        const path = '/api/v1/abuses';
        const video = options.videoId
            ? {
                id: options.videoId,
                startAt: options.startAt,
                endAt: options.endAt
            }
            : undefined;
        const comment = options.commentId
            ? { id: options.commentId }
            : undefined;
        const account = options.accountId
            ? { id: options.accountId }
            : undefined;
        const body = {
            account,
            video,
            comment,
            reason: options.reason,
            predefinedReasons: options.predefinedReasons
        };
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: body, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    getAdminList(options = {}) {
        const toPick = [
            'count',
            'filter',
            'id',
            'predefinedReason',
            'search',
            'searchReportee',
            'searchReporter',
            'searchVideo',
            'searchVideoChannel',
            'sort',
            'start',
            'state',
            'videoIs'
        ];
        const path = '/api/v1/abuses';
        const defaultQuery = { sort: 'createdAt' };
        const query = Object.assign(Object.assign({}, defaultQuery), pick(options, toPick));
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getUserList(options) {
        const toPick = [
            'id',
            'search',
            'state',
            'start',
            'count',
            'sort'
        ];
        const path = '/api/v1/users/me/abuses';
        const defaultQuery = { sort: 'createdAt' };
        const query = Object.assign(Object.assign({}, defaultQuery), pick(options, toPick));
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    update(options) {
        const { abuseId, body } = options;
        const path = '/api/v1/abuses/' + abuseId;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: body, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    delete(options) {
        const { abuseId } = options;
        const path = '/api/v1/abuses/' + abuseId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    listMessages(options) {
        const { abuseId } = options;
        const path = '/api/v1/abuses/' + abuseId + '/messages';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    deleteMessage(options) {
        const { abuseId, messageId } = options;
        const path = '/api/v1/abuses/' + abuseId + '/messages/' + messageId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    addMessage(options) {
        const { abuseId, message } = options;
        const path = '/api/v1/abuses/' + abuseId + '/messages';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { message }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=abuses-command.js.map