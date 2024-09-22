import { MyUser, ResultList, ScopedToken, User, UserAdminFlagType, UserCreateResult, UserRoleType, UserUpdateMe, UserVideoQuota, UserVideoRate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class UsersCommand extends AbstractCommand {
    askResetPassword(options: OverrideCommandOptions & {
        email: string;
    }): import("supertest").Test;
    resetPassword(options: OverrideCommandOptions & {
        userId: number;
        verificationString: string;
        password: string;
    }): import("supertest").Test;
    askSendVerifyEmail(options: OverrideCommandOptions & {
        email: string;
    }): import("supertest").Test;
    verifyEmail(options: OverrideCommandOptions & {
        userId: number;
        verificationString: string;
        isPendingEmail?: boolean;
    }): import("supertest").Test;
    banUser(options: OverrideCommandOptions & {
        userId: number;
        reason?: string;
    }): import("supertest").Test;
    unbanUser(options: OverrideCommandOptions & {
        userId: number;
    }): import("supertest").Test;
    getMyScopedTokens(options?: OverrideCommandOptions): Promise<ScopedToken>;
    renewMyScopedTokens(options?: OverrideCommandOptions): import("supertest").Test;
    create(options: OverrideCommandOptions & {
        username: string;
        password?: string;
        videoQuota?: number;
        videoQuotaDaily?: number;
        role?: UserRoleType;
        adminFlags?: UserAdminFlagType;
    }): Promise<UserCreateResult>;
    generate(username: string, role?: UserRoleType): Promise<{
        token: string;
        userId: number;
        userChannelId: number;
        userChannelName: string;
        password: string;
    }>;
    generateUserAndToken(username: string, role?: UserRoleType): Promise<string>;
    getMyInfo(options?: OverrideCommandOptions): Promise<MyUser>;
    getMyQuotaUsed(options?: OverrideCommandOptions): Promise<UserVideoQuota>;
    getMyRating(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<UserVideoRate>;
    deleteMe(options?: OverrideCommandOptions): import("supertest").Test;
    updateMe(options: OverrideCommandOptions & UserUpdateMe): import("supertest").Test;
    updateMyAvatar(options: OverrideCommandOptions & {
        fixture: string;
    }): import("supertest").SuperTestStatic.Test;
    get(options: OverrideCommandOptions & {
        userId: number;
        withStats?: boolean;
    }): Promise<User>;
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
        blocked?: boolean;
    }): Promise<ResultList<User>>;
    remove(options: OverrideCommandOptions & {
        userId: number;
    }): import("supertest").Test;
    update(options: OverrideCommandOptions & {
        userId: number;
        email?: string;
        emailVerified?: boolean;
        videoQuota?: number;
        videoQuotaDaily?: number;
        password?: string;
        adminFlags?: UserAdminFlagType;
        pluginAuth?: string;
        role?: UserRoleType;
    }): import("supertest").Test;
}
//# sourceMappingURL=users-command.d.ts.map