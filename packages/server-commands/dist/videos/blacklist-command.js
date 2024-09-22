import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class BlacklistCommand extends AbstractCommand {
    add(options) {
        const { videoId, reason, unfederate } = options;
        const path = '/api/v1/videos/' + videoId + '/blacklist';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { reason, unfederate }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    update(options) {
        const { videoId, reason } = options;
        const path = '/api/v1/videos/' + videoId + '/blacklist';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { reason }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    remove(options) {
        const { videoId } = options;
        const path = '/api/v1/videos/' + videoId + '/blacklist';
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options = {}) {
        const { sort, type } = options;
        const path = '/api/v1/videos/blacklist/';
        const query = { sort, type };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=blacklist-command.js.map