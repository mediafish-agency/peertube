import express from 'express';
import OAuth2Server from '@node-oauth/oauth2-server';
import { MOAuthClient } from '../../types/models/index.js';
import { BypassLogin } from './oauth-model.js';
declare class MissingTwoFactorError extends Error {
    code: 401;
    name: "missing_two_factor";
}
declare class InvalidTwoFactorError extends Error {
    code: 400;
    name: "invalid_two_factor";
}
declare function handleOAuthToken(req: express.Request, options: {
    refreshTokenAuthName?: string;
    bypassLogin?: BypassLogin;
}): Promise<{
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    client: MOAuthClient;
    user: import("../../types/models/index.js").MUser;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}>;
declare function handleOAuthAuthenticate(req: express.Request, res: express.Response): Promise<OAuth2Server.Token>;
export { MissingTwoFactorError, InvalidTwoFactorError, handleOAuthToken, handleOAuthAuthenticate };
//# sourceMappingURL=oauth.d.ts.map