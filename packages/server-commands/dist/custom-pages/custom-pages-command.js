import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class CustomPagesCommand extends AbstractCommand {
    getInstanceHomepage(options = {}) {
        const path = '/api/v1/custom-pages/homepage/instance';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    updateInstanceHomepage(options) {
        const { content } = options;
        const path = '/api/v1/custom-pages/homepage/instance';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { content }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=custom-pages-command.js.map