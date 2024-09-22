import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class OverviewsCommand extends AbstractCommand {
    getVideos(options) {
        const { page } = options;
        const path = '/api/v1/overviews/videos';
        const query = { page };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=overviews-command.js.map