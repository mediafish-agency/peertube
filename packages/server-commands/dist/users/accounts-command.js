import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class AccountsCommand extends AbstractCommand {
    list(options = {}) {
        const { sort = '-createdAt' } = options;
        const path = '/api/v1/accounts';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { sort }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    get(options) {
        const path = '/api/v1/accounts/' + options.accountName;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listRatings(options) {
        const { rating, accountName } = options;
        const path = '/api/v1/accounts/' + accountName + '/ratings';
        const query = { rating };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listFollowers(options) {
        const { accountName, start, count, sort, search } = options;
        const path = '/api/v1/accounts/' + accountName + '/followers';
        const query = { start, count, sort, search };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=accounts-command.js.map