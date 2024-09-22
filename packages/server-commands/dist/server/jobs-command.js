import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class JobsCommand extends AbstractCommand {
    async getLatest(options) {
        const { data } = await this.list(Object.assign(Object.assign({}, options), { start: 0, count: 1, sort: '-createdAt' }));
        if (data.length === 0)
            return undefined;
        return data[0];
    }
    pauseJobQueue(options = {}) {
        const path = '/api/v1/jobs/pause';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    resumeJobQueue(options = {}) {
        const path = '/api/v1/jobs/resume';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options = {}) {
        const path = this.buildJobsUrl(options.state);
        const query = pick(options, ['start', 'count', 'sort', 'jobType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listFailed(options) {
        const path = this.buildJobsUrl('failed');
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { start: 0, count: 50 }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    buildJobsUrl(state) {
        let path = '/api/v1/jobs';
        if (state)
            path += '/' + state;
        return path;
    }
}
//# sourceMappingURL=jobs-command.js.map