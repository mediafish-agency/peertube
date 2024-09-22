import { OAuthTokenModel } from './oauth-token.js';
import { SequelizeModel } from '../shared/index.js';
export declare class OAuthClientModel extends SequelizeModel<OAuthClientModel> {
    clientId: string;
    clientSecret: string;
    grants: string[];
    redirectUris: string[];
    createdAt: Date;
    updatedAt: Date;
    OAuthTokens: Awaited<OAuthTokenModel>[];
    static countTotal(): Promise<number>;
    static loadFirstClient(): Promise<OAuthClientModel>;
    static getByIdAndSecret(clientId: string, clientSecret: string): Promise<OAuthClientModel>;
}
//# sourceMappingURL=oauth-client.d.ts.map