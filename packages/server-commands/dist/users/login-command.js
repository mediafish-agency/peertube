import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class LoginCommand extends AbstractCommand {
    async login(options = {}) {
        const res = await this._login(options);
        return this.unwrapLoginBody(res.body);
    }
    async loginAndGetResponse(options = {}) {
        const res = await this._login(options);
        return {
            res,
            body: this.unwrapLoginBody(res.body)
        };
    }
    async getAccessToken(arg1, password) {
        let user;
        if (!arg1)
            user = this.server.store.user;
        else if (typeof arg1 === 'object')
            user = arg1;
        else
            user = { username: arg1, password };
        try {
            const body = await this.login({ user });
            return body.access_token;
        }
        catch (err) {
            throw new Error(`Cannot authenticate. Please check your username/password. (${err})`);
        }
    }
    loginUsingExternalToken(options) {
        const { username, externalAuthToken } = options;
        const path = '/api/v1/users/token';
        const body = {
            client_id: this.server.store.client.id,
            client_secret: this.server.store.client.secret,
            username,
            response_type: 'code',
            grant_type: 'password',
            scope: 'upload',
            externalAuthToken
        };
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, requestType: 'form', fields: body, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    logout(options) {
        const path = '/api/v1/users/revoke-token';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, requestType: 'form', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    refreshToken(options) {
        const path = '/api/v1/users/token';
        const body = {
            client_id: this.server.store.client.id,
            client_secret: this.server.store.client.secret,
            refresh_token: options.refreshToken,
            response_type: 'code',
            grant_type: 'refresh_token'
        };
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, requestType: 'form', fields: body, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getClient(options = {}) {
        const path = '/api/v1/oauth-clients/local';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, host: this.server.host, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    _login(options) {
        var _a;
        const { client = this.server.store.client, user = this.server.store.user, otpToken } = options;
        const path = '/api/v1/users/token';
        const body = {
            client_id: client.id,
            client_secret: client.secret,
            username: user.username,
            password: (_a = user.password) !== null && _a !== void 0 ? _a : 'password',
            response_type: 'code',
            grant_type: 'password',
            scope: 'upload'
        };
        const headers = otpToken
            ? { 'x-peertube-otp': otpToken }
            : {};
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path,
            headers, requestType: 'form', fields: body, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    unwrapLoginBody(body) {
        return body;
    }
}
//# sourceMappingURL=login-command.js.map