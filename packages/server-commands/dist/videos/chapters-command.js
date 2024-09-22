import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class ChaptersCommand extends AbstractCommand {
    list(options) {
        const path = '/api/v1/videos/' + options.videoId + '/chapters';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    update(options) {
        const path = '/api/v1/videos/' + options.videoId + '/chapters';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                chapters: options.chapters
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=chapters-command.js.map