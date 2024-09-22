import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class BlocklistCommand extends AbstractCommand {
    listMyAccountBlocklist(options) {
        const path = '/api/v1/users/me/blocklist/accounts';
        return this.listBlocklist(options, path);
    }
    listMyServerBlocklist(options) {
        const path = '/api/v1/users/me/blocklist/servers';
        return this.listBlocklist(options, path);
    }
    listServerAccountBlocklist(options) {
        const path = '/api/v1/server/blocklist/accounts';
        return this.listBlocklist(options, path);
    }
    listServerServerBlocklist(options) {
        const path = '/api/v1/server/blocklist/servers';
        return this.listBlocklist(options, path);
    }
    getStatus(options) {
        const { accounts, hosts } = options;
        const path = '/api/v1/blocklist/status';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                accounts,
                hosts
            }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    addToMyBlocklist(options) {
        const { account, server } = options;
        const path = account
            ? '/api/v1/users/me/blocklist/accounts'
            : '/api/v1/users/me/blocklist/servers';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                accountName: account,
                host: server
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    addToServerBlocklist(options) {
        const { account, server } = options;
        const path = account
            ? '/api/v1/server/blocklist/accounts'
            : '/api/v1/server/blocklist/servers';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                accountName: account,
                host: server
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeFromMyBlocklist(options) {
        const { account, server } = options;
        const path = account
            ? '/api/v1/users/me/blocklist/accounts/' + account
            : '/api/v1/users/me/blocklist/servers/' + server;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeFromServerBlocklist(options) {
        const { account, server } = options;
        const path = account
            ? '/api/v1/server/blocklist/accounts/' + account
            : '/api/v1/server/blocklist/servers/' + server;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    listBlocklist(options, path) {
        const { start, count, search, sort = '-createdAt' } = options;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { start, count, sort, search }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=blocklist-command.js.map