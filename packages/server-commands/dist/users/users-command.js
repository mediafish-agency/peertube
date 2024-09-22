import { omit, pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode, UserRole } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class UsersCommand extends AbstractCommand {
    askResetPassword(options) {
        const { email } = options;
        const path = '/api/v1/users/ask-reset-password';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { email }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    resetPassword(options) {
        const { userId, verificationString, password } = options;
        const path = '/api/v1/users/' + userId + '/reset-password';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { password, verificationString }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    askSendVerifyEmail(options) {
        const { email } = options;
        const path = '/api/v1/users/ask-send-verify-email';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { email }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    verifyEmail(options) {
        const { userId, verificationString, isPendingEmail = false } = options;
        const path = '/api/v1/users/' + userId + '/verify-email';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                verificationString,
                isPendingEmail
            }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    banUser(options) {
        const { userId, reason } = options;
        const path = '/api/v1/users' + '/' + userId + '/block';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { reason }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    unbanUser(options) {
        const { userId } = options;
        const path = '/api/v1/users' + '/' + userId + '/unblock';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getMyScopedTokens(options = {}) {
        const path = '/api/v1/users/scoped-tokens';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    renewMyScopedTokens(options = {}) {
        const path = '/api/v1/users/scoped-tokens';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    create(options) {
        const { username, adminFlags, password = 'password', videoQuota, videoQuotaDaily, role = UserRole.USER } = options;
        const path = '/api/v1/users';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: {
                username,
                password,
                role,
                adminFlags,
                email: username + '@example.com',
                videoQuota,
                videoQuotaDaily
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }))).then(res => res.user);
    }
    async generate(username, role) {
        const password = 'password';
        const user = await this.create({ username, password, role });
        const token = await this.server.login.getAccessToken({ username, password });
        const me = await this.getMyInfo({ token });
        return {
            token,
            userId: user.id,
            userChannelId: me.videoChannels[0].id,
            userChannelName: me.videoChannels[0].name,
            password
        };
    }
    async generateUserAndToken(username, role) {
        const password = 'password';
        await this.create({ username, password, role });
        return this.server.login.getAccessToken({ username, password });
    }
    getMyInfo(options = {}) {
        const path = '/api/v1/users/me';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getMyQuotaUsed(options = {}) {
        const path = '/api/v1/users/me/video-quota-used';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getMyRating(options) {
        const { videoId } = options;
        const path = '/api/v1/users/me/videos/' + videoId + '/rating';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    deleteMe(options = {}) {
        const path = '/api/v1/users/me';
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    updateMe(options) {
        const path = '/api/v1/users/me';
        const toSend = omit(options, ['expectedStatus', 'token']);
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: toSend, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    updateMyAvatar(options) {
        const { fixture } = options;
        const path = '/api/v1/users/me/avatar/pick';
        return this.updateImageRequest(Object.assign(Object.assign({}, options), { path,
            fixture, fieldname: 'avatarfile', implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    get(options) {
        const { userId, withStats } = options;
        const path = '/api/v1/users/' + userId;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: { withStats }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    list(options = {}) {
        const path = '/api/v1/users';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort', 'search', 'blocked']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    remove(options) {
        const { userId } = options;
        const path = '/api/v1/users/' + userId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    update(options) {
        const path = '/api/v1/users/' + options.userId;
        const toSend = {};
        if (options.password !== undefined && options.password !== null)
            toSend.password = options.password;
        if (options.email !== undefined && options.email !== null)
            toSend.email = options.email;
        if (options.emailVerified !== undefined && options.emailVerified !== null)
            toSend.emailVerified = options.emailVerified;
        if (options.videoQuota !== undefined && options.videoQuota !== null)
            toSend.videoQuota = options.videoQuota;
        if (options.videoQuotaDaily !== undefined && options.videoQuotaDaily !== null)
            toSend.videoQuotaDaily = options.videoQuotaDaily;
        if (options.role !== undefined && options.role !== null)
            toSend.role = options.role;
        if (options.adminFlags !== undefined && options.adminFlags !== null)
            toSend.adminFlags = options.adminFlags;
        if (options.pluginAuth !== undefined)
            toSend.pluginAuth = options.pluginAuth;
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: toSend, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=users-command.js.map