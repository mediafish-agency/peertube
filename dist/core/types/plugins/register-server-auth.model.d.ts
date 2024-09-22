import express from 'express';
import { UserAdminFlagType, UserRoleType } from '@peertube/peertube-models';
import { MOAuthToken, MUser } from '../models/index.js';
export type RegisterServerAuthOptions = RegisterServerAuthPassOptions | RegisterServerAuthExternalOptions;
export type AuthenticatedResultUpdaterFieldName = 'displayName' | 'role' | 'adminFlags' | 'videoQuota' | 'videoQuotaDaily';
export interface RegisterServerAuthenticatedResult {
    userUpdater?: <T>(options: {
        fieldName: AuthenticatedResultUpdaterFieldName;
        currentValue: T;
        newValue: T;
    }) => T;
    username: string;
    email: string;
    role?: UserRoleType;
    displayName?: string;
    adminFlags?: UserAdminFlagType;
    videoQuota?: number;
    videoQuotaDaily?: number;
}
export interface RegisterServerExternalAuthenticatedResult extends RegisterServerAuthenticatedResult {
    req: express.Request;
    res: express.Response;
}
interface RegisterServerAuthBase {
    authName: string;
    onLogout?(user: MUser, req: express.Request): Promise<string>;
    hookTokenValidity?(options: {
        token: MOAuthToken;
        type: 'access' | 'refresh';
    }): Promise<{
        valid: boolean;
    }>;
}
export interface RegisterServerAuthPassOptions extends RegisterServerAuthBase {
    getWeight(): number;
    login(body: {
        id: string;
        password: string;
    }): Promise<RegisterServerAuthenticatedResult | null>;
}
export interface RegisterServerAuthExternalOptions extends RegisterServerAuthBase {
    authDisplayName: () => string;
    onAuthRequest: (req: express.Request, res: express.Response) => void;
}
export interface RegisterServerAuthExternalResult {
    userAuthenticated(options: RegisterServerExternalAuthenticatedResult): void;
}
export {};
//# sourceMappingURL=register-server-auth.model.d.ts.map