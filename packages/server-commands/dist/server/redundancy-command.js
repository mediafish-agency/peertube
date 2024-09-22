import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class RedundancyCommand extends AbstractCommand {
    updateRedundancy(options) {
        const { host, redundancyAllowed } = options;
        const path = '/api/v1/server/redundancy/' + host;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { redundancyAllowed }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    listVideos(options) {
        const path = '/api/v1/server/redundancy/videos';
        const { target, start, count, sort } = options;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                start: start !== null && start !== void 0 ? start : 0,
                count: count !== null && count !== void 0 ? count : 5,
                sort: sort !== null && sort !== void 0 ? sort : 'name',
                target
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    addVideo(options) {
        const path = '/api/v1/server/redundancy/videos';
        const { videoId } = options;
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { videoId }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeVideo(options) {
        const { redundancyId } = options;
        const path = '/api/v1/server/redundancy/videos/' + redundancyId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=redundancy-command.js.map