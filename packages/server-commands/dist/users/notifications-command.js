import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class NotificationsCommand extends AbstractCommand {
    updateMySettings(options) {
        const path = '/api/v1/users/me/notification-settings';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.settings, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options) {
        const { start, count, unread, sort = '-createdAt' } = options;
        const path = '/api/v1/users/me/notifications';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                start,
                count,
                sort,
                unread
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    markAsRead(options) {
        const { ids } = options;
        const path = '/api/v1/users/me/notifications/read';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { ids }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    markAsReadAll(options) {
        const path = '/api/v1/users/me/notifications/read-all';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async getLatest(options = {}) {
        const { total, data } = await this.list(Object.assign(Object.assign({}, options), { start: 0, count: 1, sort: '-createdAt' }));
        if (total === 0)
            return undefined;
        return data[0];
    }
}
//# sourceMappingURL=notifications-command.js.map