import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class FollowsCommand extends AbstractCommand {
    getFollowers(options = {}) {
        const path = '/api/v1/server/followers';
        const query = pick(options, ['start', 'count', 'sort', 'search', 'state', 'actorType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getFollowings(options = {}) {
        const path = '/api/v1/server/following';
        const query = pick(options, ['start', 'count', 'sort', 'search', 'state', 'actorType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    follow(options) {
        const path = '/api/v1/server/following';
        const fields = {};
        if (options.hosts) {
            fields.hosts = options.hosts.map(f => f.replace(/^http:\/\//, ''));
        }
        if (options.handles) {
            fields.handles = options.handles;
        }
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path,
            fields, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async unfollow(options) {
        const { target } = options;
        const handle = typeof target === 'string'
            ? target
            : target.host;
        const path = '/api/v1/server/following/' + handle;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    acceptFollower(options) {
        const path = '/api/v1/server/followers/' + options.follower + '/accept';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    rejectFollower(options) {
        const path = '/api/v1/server/followers/' + options.follower + '/reject';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeFollower(options) {
        const path = '/api/v1/server/followers/peertube@' + options.follower.host;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=follows-command.js.map