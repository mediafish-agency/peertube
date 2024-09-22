import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class ChangeOwnershipCommand extends AbstractCommand {
    create(options) {
        const { videoId, username } = options;
        const path = '/api/v1/videos/' + videoId + '/give-ownership';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { username }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options = {}) {
        const path = '/api/v1/videos/ownership';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { sort: '-createdAt' }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    accept(options) {
        const { ownershipId, channelId } = options;
        const path = '/api/v1/videos/ownership/' + ownershipId + '/accept';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { channelId }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    refuse(options) {
        const { ownershipId } = options;
        const path = '/api/v1/videos/ownership/' + ownershipId + '/refuse';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=change-ownership-command.js.map