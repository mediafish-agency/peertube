import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class VideoImportsCommand extends AbstractCommand {
    async importVideo(options) {
        const { attributes } = options;
        const path = '/api/v1/videos/imports';
        let defaultChannelId = 1;
        try {
            const { videoChannels } = await this.server.users.getMyInfo({ token: options.token });
            defaultChannelId = videoChannels[0].id;
        }
        catch (e) { }
        let attaches = {};
        if (attributes.torrentfile)
            attaches = { torrentfile: attributes.torrentfile };
        if (attributes.thumbnailfile)
            attaches = { thumbnailfile: attributes.thumbnailfile };
        if (attributes.previewfile)
            attaches = { previewfile: attributes.previewfile };
        return unwrapBody(this.postUploadRequest(Object.assign(Object.assign({}, options), { path,
            attaches, fields: Object.assign({ channelId: defaultChannelId }, options.attributes), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    delete(options) {
        const path = '/api/v1/videos/imports/' + options.importId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    cancel(options) {
        const path = '/api/v1/videos/imports/' + options.importId + '/cancel';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getMyVideoImports(options = {}) {
        const { sort, targetUrl, videoChannelSyncId, search } = options;
        const path = '/api/v1/users/me/videos/imports';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { sort, targetUrl, videoChannelSyncId, search }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=video-imports-command.js.map