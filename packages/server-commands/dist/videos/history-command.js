import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class HistoryCommand extends AbstractCommand {
    list(options = {}) {
        const { search } = options;
        const path = '/api/v1/users/me/history/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                search
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    removeElement(options) {
        const { videoId } = options;
        const path = '/api/v1/users/me/history/videos/' + videoId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeAll(options = {}) {
        const { beforeDate } = options;
        const path = '/api/v1/users/me/history/videos/remove';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { beforeDate }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=history-command.js.map