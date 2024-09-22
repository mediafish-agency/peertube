import { Transaction } from 'sequelize';
import { MUserAccountId } from '../../types/models/index.js';
import { MOAuthTokenUser } from '../../types/models/oauth/oauth-token.js';
import { UserModel } from '../user/user.js';
import { OAuthClientModel } from './oauth-client.js';
import { SequelizeModel } from '../shared/index.js';
export type OAuthTokenInfo = {
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    client: {
        id: number;
        grants: string[];
    };
    user: MUserAccountId;
    token: MOAuthTokenUser;
};
export declare class OAuthTokenModel extends SequelizeModel<OAuthTokenModel> {
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    authName: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    User: Awaited<UserModel>;
    oAuthClientId: number;
    OAuthClients: Awaited<OAuthClientModel>[];
    static removeTokenCache(token: OAuthTokenModel): void;
    static loadByRefreshToken(refreshToken: string): Promise<OAuthTokenModel>;
    static getByRefreshTokenAndPopulateClient(refreshToken: string): Promise<OAuthTokenInfo>;
    static getByTokenAndPopulateUser(bearerToken: string): Promise<MOAuthTokenUser>;
    static getByRefreshTokenAndPopulateUser(refreshToken: string): Promise<MOAuthTokenUser>;
    static deleteUserToken(userId: number, t?: Transaction): Promise<number>;
}
//# sourceMappingURL=oauth-token.d.ts.map