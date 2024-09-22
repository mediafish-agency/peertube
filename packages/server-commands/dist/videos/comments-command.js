import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class CommentsCommand extends AbstractCommand {
    listForAdmin(options = {}) {
        const path = '/api/v1/videos/comments';
        const query = Object.assign(Object.assign({}, this.buildListForAdminOrAccountQuery(options)), pick(options, ['isLocal', 'onLocalVideo']));
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listCommentsOnMyVideos(options = {}) {
        const path = '/api/v1/users/me/videos/comments';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign(Object.assign({}, this.buildListForAdminOrAccountQuery(options)), { isHeldForReview: options.isHeldForReview }), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    buildListForAdminOrAccountQuery(options) {
        return Object.assign({ sort: '-createdAt' }, pick(options, ['start', 'count', 'search', 'searchAccount', 'searchVideo', 'sort', 'videoId', 'videoChannelId', 'autoTagOneOf']));
    }
    listThreads(options) {
        const { start, count, sort, videoId, videoPassword } = options;
        const path = '/api/v1/videos/' + videoId + '/comment-threads';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { start, count, sort }, headers: this.buildVideoPasswordHeader(videoPassword), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getThread(options) {
        const { videoId, threadId } = options;
        const path = '/api/v1/videos/' + videoId + '/comment-threads/' + threadId;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async getThreadOf(options) {
        const { videoId, text } = options;
        const threadId = await this.findCommentId({ videoId, text });
        return this.getThread(Object.assign(Object.assign({}, options), { videoId, threadId }));
    }
    async createThread(options) {
        var _a;
        const { videoId, text, videoPassword } = options;
        const path = '/api/v1/videos/' + videoId + '/comment-threads';
        const body = await unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { text }, headers: this.buildVideoPasswordHeader(videoPassword), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        this.lastThreadId = (_a = body.comment) === null || _a === void 0 ? void 0 : _a.id;
        this.lastVideoId = videoId;
        return body.comment;
    }
    async addReply(options) {
        var _a;
        const { videoId, toCommentId, text, videoPassword } = options;
        const path = '/api/v1/videos/' + videoId + '/comments/' + toCommentId;
        const body = await unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { text }, headers: this.buildVideoPasswordHeader(videoPassword), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        this.lastReplyId = (_a = body.comment) === null || _a === void 0 ? void 0 : _a.id;
        return body.comment;
    }
    async addReplyToLastReply(options) {
        return this.addReply(Object.assign(Object.assign({}, options), { videoId: this.lastVideoId, toCommentId: this.lastReplyId }));
    }
    async addReplyToLastThread(options) {
        return this.addReply(Object.assign(Object.assign({}, options), { videoId: this.lastVideoId, toCommentId: this.lastThreadId }));
    }
    async findCommentId(options) {
        const { videoId, text } = options;
        const { data } = await this.listForAdmin({ videoId, count: 25, sort: '-createdAt' });
        return data.find(c => c.text === text).id;
    }
    delete(options) {
        const { videoId, commentId } = options;
        const path = '/api/v1/videos/' + videoId + '/comments/' + commentId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async deleteAllComments(options) {
        const { data } = await this.listForAdmin(Object.assign(Object.assign({}, options), { start: 0, count: 20 }));
        for (const comment of data) {
            if ((comment === null || comment === void 0 ? void 0 : comment.video.uuid) !== options.videoUUID)
                continue;
            await this.delete(Object.assign({ videoId: options.videoUUID, commentId: comment.id }, options));
        }
    }
    approve(options) {
        const { videoId, commentId } = options;
        const path = '/api/v1/videos/' + videoId + '/comments/' + commentId + '/approve';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=comments-command.js.map