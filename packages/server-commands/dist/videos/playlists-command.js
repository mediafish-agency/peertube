import { omit, pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode, VideoPlaylistPrivacy, VideoPlaylistType } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class PlaylistsCommand extends AbstractCommand {
    list(options = {}) {
        const path = '/api/v1/video-playlists';
        const query = pick(options, ['start', 'count', 'sort', 'playlistType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listByChannel(options) {
        const path = '/api/v1/video-channels/' + options.handle + '/video-playlists';
        const query = pick(options, ['start', 'count', 'sort', 'playlistType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listByAccount(options) {
        const path = '/api/v1/accounts/' + options.handle + '/video-playlists';
        const query = pick(options, ['start', 'count', 'sort', 'search', 'playlistType']);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    get(options) {
        const { playlistId } = options;
        const path = '/api/v1/video-playlists/' + playlistId;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async getWatchLater(options) {
        const { data: playlists } = await this.listByAccount(Object.assign(Object.assign({}, options), { playlistType: VideoPlaylistType.WATCH_LATER }));
        return playlists[0];
    }
    listVideos(options) {
        var _a;
        const path = '/api/v1/video-playlists/' + options.playlistId + '/videos';
        const query = (_a = options.query) !== null && _a !== void 0 ? _a : {};
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign(Object.assign({}, query), { start: options.start, count: options.count }), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    delete(options) {
        const path = '/api/v1/video-playlists/' + options.playlistId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async create(options) {
        const path = '/api/v1/video-playlists';
        const fields = omit(options.attributes, ['thumbnailfile']);
        const attaches = options.attributes.thumbnailfile
            ? { thumbnailfile: options.attributes.thumbnailfile }
            : {};
        const body = await unwrapBody(this.postUploadRequest(Object.assign(Object.assign({}, options), { path,
            fields,
            attaches, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        return body.videoPlaylist;
    }
    async quickCreate(options) {
        const { displayName, privacy = VideoPlaylistPrivacy.PUBLIC } = options;
        const { videoChannels } = await this.server.users.getMyInfo({ token: options.token });
        return this.create(Object.assign(Object.assign({}, options), { attributes: {
                displayName,
                privacy,
                videoChannelId: privacy === VideoPlaylistPrivacy.PUBLIC
                    ? videoChannels[0].id
                    : undefined
            } }));
    }
    update(options) {
        const path = '/api/v1/video-playlists/' + options.playlistId;
        const fields = omit(options.attributes, ['thumbnailfile']);
        const attaches = options.attributes.thumbnailfile
            ? { thumbnailfile: options.attributes.thumbnailfile }
            : {};
        return this.putUploadRequest(Object.assign(Object.assign({}, options), { path,
            fields,
            attaches, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async addElement(options) {
        const attributes = Object.assign(Object.assign({}, options.attributes), { videoId: await this.server.videos.getId(Object.assign(Object.assign({}, options), { uuid: options.attributes.videoId })) });
        const path = '/api/v1/video-playlists/' + options.playlistId + '/videos';
        const body = await unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        return body.videoPlaylistElement;
    }
    updateElement(options) {
        const path = '/api/v1/video-playlists/' + options.playlistId + '/videos/' + options.elementId;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeElement(options) {
        const path = '/api/v1/video-playlists/' + options.playlistId + '/videos/' + options.elementId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    reorderElements(options) {
        const path = '/api/v1/video-playlists/' + options.playlistId + '/videos/reorder';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getPrivacies(options = {}) {
        const path = '/api/v1/video-playlists/privacies';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    videosExist(options) {
        const { videoIds } = options;
        const path = '/api/v1/users/me/video-playlists/videos-exist';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { videoIds }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=playlists-command.js.map