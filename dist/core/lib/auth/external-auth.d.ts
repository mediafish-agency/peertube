import { MUser } from '../../types/models/index.js';
import { RegisterServerExternalAuthenticatedResult } from '../../types/plugins/register-server-auth.model.js';
import { BypassLogin } from './oauth-model.js';
export type ExternalUser = Pick<MUser, 'username' | 'email' | 'role' | 'adminFlags' | 'videoQuotaDaily' | 'videoQuota'> & {
    displayName: string;
};
declare function onExternalUserAuthenticated(options: {
    npmName: string;
    authName: string;
    authResult: RegisterServerExternalAuthenticatedResult;
}): Promise<void>;
declare function getAuthNameFromRefreshGrant(refreshToken?: string): Promise<string>;
declare function getBypassFromPasswordGrant(username: string, password: string): Promise<BypassLogin>;
declare function getBypassFromExternalAuth(username: string, externalAuthToken: string): BypassLogin;
export { onExternalUserAuthenticated, getBypassFromExternalAuth, getAuthNameFromRefreshGrant, getBypassFromPasswordGrant };
//# sourceMappingURL=external-auth.d.ts.map