import { buildUUID } from '@peertube/peertube-node-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class FeedCommand extends AbstractCommand {
    getXML(options) {
        const { feed, format, ignoreCache } = options;
        const path = '/feeds/' + feed + '.xml';
        const query = {};
        if (ignoreCache)
            query.v = buildUUID();
        if (format)
            query.format = format;
        return this.getRequestText(Object.assign(Object.assign({}, options), { path,
            query, accept: 'application/xml', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getPodcastXML(options) {
        const { ignoreCache, channelId } = options;
        const path = `/feeds/podcast/videos.xml`;
        const query = {};
        if (ignoreCache)
            query.v = buildUUID();
        if (channelId)
            query.videoChannelId = channelId + '';
        return this.getRequestText(Object.assign(Object.assign({}, options), { path,
            query, accept: 'application/xml', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getJSON(options) {
        const { feed, query = {}, ignoreCache } = options;
        const path = '/feeds/' + feed + '.json';
        const cacheQuery = ignoreCache
            ? { v: buildUUID() }
            : {};
        return this.getRequestText(Object.assign(Object.assign({}, options), { path, query: Object.assign(Object.assign({}, query), cacheQuery), accept: 'application/json', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=feeds-command.js.map