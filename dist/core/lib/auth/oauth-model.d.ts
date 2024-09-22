import express from 'express';
import { RegisterServerAuthenticatedResult } from '../../types/index.js';
import { MOAuthClient } from '../../types/models/index.js';
import { MOAuthTokenUser } from '../../types/models/oauth/oauth-token.js';
import { MUser, MUserDefault } from '../../types/models/user/user.js';
import { OAuthClientModel } from '../../models/oauth/oauth-client.js';
import { ExternalUser } from './external-auth.js';
type TokenInfo = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
};
export type BypassLogin = {
    bypass: boolean;
    pluginName: string;
    authName?: string;
    user: ExternalUser;
    userUpdater: RegisterServerAuthenticatedResult['userUpdater'];
};
declare function getAccessToken(bearerToken: string): Promise<MOAuthTokenUser>;
declare function getClient(clientId: string, clientSecret: string): Promise<OAuthClientModel>;
declare function getRefreshToken(refreshToken: string): Promise<import("../../models/oauth/oauth-token.js").OAuthTokenInfo>;
declare function getUser(usernameOrEmail?: string, password?: string, bypassLogin?: BypassLogin): Promise<MUserDefault>;
declare function revokeToken(tokenInfo: {
    refreshToken: string;
}, options?: {
    req?: express.Request;
    explicitLogout?: boolean;
}): Promise<{
    success: boolean;
    redirectUrl?: string;
}>;
declare function saveToken(token: TokenInfo, client: MOAuthClient, user: MUser, options?: {
    refreshTokenAuthName?: string;
    bypassLogin?: BypassLogin;
}): Promise<{
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    client: MOAuthClient;
    user: MUser;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}>;
export { getAccessToken, getClient, getRefreshToken, getUser, revokeToken, saveToken };
//# sourceMappingURL=oauth-model.d.ts.map