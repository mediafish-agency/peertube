import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class ChannelsCommand extends AbstractCommand {
    list(options = {}) {
        const path = '/api/v1/video-channels';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort', 'withStats']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listByAccount(options) {
        const { accountName, sort = 'createdAt' } = options;
        const path = '/api/v1/accounts/' + accountName + '/video-channels';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ sort }, pick(options, ['start', 'count', 'withStats', 'search'])), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async create(options) {
        const path = '/api/v1/video-channels/';
        const defaultAttributes = {
            displayName: 'my super video channel',
            description: 'my super channel description',
            support: 'my super channel support'
        };
        const attributes = Object.assign(Object.assign({}, defaultAttributes), options.attributes);
        const body = await unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        return body.videoChannel;
    }
    update(options) {
        const { channelName, attributes } = options;
        const path = '/api/v1/video-channels/' + channelName;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    delete(options) {
        const path = '/api/v1/video-channels/' + options.channelName;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    get(options) {
        const path = '/api/v1/video-channels/' + options.channelName;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    updateImage(options) {
        const { channelName, fixture, type } = options;
        const path = `/api/v1/video-channels/${channelName}/${type}/pick`;
        return this.updateImageRequest(Object.assign(Object.assign({}, options), { path,
            fixture, fieldname: type + 'file', implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    deleteImage(options) {
        const { channelName, type } = options;
        const path = `/api/v1/video-channels/${channelName}/${type}`;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    listFollowers(options) {
        const { channelName, start, count, sort, search } = options;
        const path = '/api/v1/video-channels/' + channelName + '/followers';
        const query = { start, count, sort, search };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    importVideos(options) {
        const { channelName, externalChannelUrl, videoChannelSyncId } = options;
        const path = `/api/v1/video-channels/${channelName}/import-videos`;
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { externalChannelUrl, videoChannelSyncId }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=channels-command.js.map