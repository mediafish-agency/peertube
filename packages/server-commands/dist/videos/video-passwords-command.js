import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class VideoPasswordsCommand extends AbstractCommand {
    list(options) {
        const { start, count, sort, videoId } = options;
        const path = '/api/v1/videos/' + videoId + '/passwords';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { start, count, sort }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    updateAll(options) {
        const { videoId, passwords } = options;
        const path = `/api/v1/videos/${videoId}/passwords`;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { passwords }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    remove(options) {
        const { id, videoId } = options;
        const path = `/api/v1/videos/${videoId}/passwords/${id}`;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=video-passwords-command.js.map