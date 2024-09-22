import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../index.js';
import { AbstractCommand } from '../shared/index.js';
export class WatchedWordsCommand extends AbstractCommand {
    listWordsLists(options) {
        const query = Object.assign({ sort: '-createdAt' }, pick(options, ['start', 'count', 'sort']));
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: this.buildAPIBasePath(options.accountName), query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    createList(options) {
        const body = pick(options, ['listName', 'words']);
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path: this.buildAPIBasePath(options.accountName), fields: body, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    updateList(options) {
        const body = pick(options, ['listName', 'words']);
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path: this.buildAPIBasePath(options.accountName) + '/' + options.listId, fields: body, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    deleteList(options) {
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path: this.buildAPIBasePath(options.accountName) + '/' + options.listId, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    buildAPIBasePath(accountName) {
        return accountName
            ? '/api/v1/watched-words/accounts/' + accountName + '/lists'
            : '/api/v1/watched-words/server/lists';
    }
}
//# sourceMappingURL=watched-words-command.js.map