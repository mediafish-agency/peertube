import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class SearchCommand extends AbstractCommand {
    searchChannels(options) {
        return this.advancedChannelSearch(Object.assign(Object.assign({}, options), { search: { search: options.search } }));
    }
    advancedChannelSearch(options) {
        const { search } = options;
        const path = '/api/v1/search/video-channels';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: search, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    searchPlaylists(options) {
        return this.advancedPlaylistSearch(Object.assign(Object.assign({}, options), { search: { search: options.search } }));
    }
    advancedPlaylistSearch(options) {
        const { search } = options;
        const path = '/api/v1/search/video-playlists';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: search, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    searchVideos(options) {
        const { search, sort } = options;
        return this.advancedVideoSearch(Object.assign(Object.assign({}, options), { search: {
                search,
                sort: sort !== null && sort !== void 0 ? sort : '-publishedAt'
            } }));
    }
    advancedVideoSearch(options) {
        const { search } = options;
        const path = '/api/v1/search/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: search, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=search-command.js.map