import { Transaction } from 'sequelize';
import { ActivityPubActorType, UserAdminFlagType, UserRoleType } from '@peertube/peertube-models';
import { MAccountDefault, MChannelActor } from '../types/models/index.js';
import { MRegistration, MUser, MUserDefault, MUserId } from '../types/models/user/index.js';
type ChannelNames = {
    name: string;
    displayName: string;
};
declare function buildUser(options: {
    username: string;
    password: string;
    email: string;
    role?: UserRoleType;
    adminFlags?: UserAdminFlagType;
    emailVerified: boolean | null;
    videoQuota?: number;
    videoQuotaDaily?: number;
    pluginAuth?: string;
}): MUser;
declare function createUserAccountAndChannelAndPlaylist(parameters: {
    userToCreate: MUser;
    userDisplayName?: string;
    channelNames?: ChannelNames;
    validateUser?: boolean;
}): Promise<{
    user: MUserDefault;
    account: MAccountDefault;
    videoChannel: MChannelActor;
}>;
declare function createLocalAccountWithoutKeys(parameters: {
    name: string;
    displayName?: string;
    userId: number | null;
    applicationId: number | null;
    t: Transaction | undefined;
    type?: ActivityPubActorType;
}): Promise<MAccountDefault>;
declare function createApplicationActor(applicationId: number): Promise<MAccountDefault>;
declare function sendVerifyUserEmail(user: MUser, isPendingEmail?: boolean): Promise<void>;
declare function sendVerifyRegistrationEmail(registration: MRegistration): Promise<void>;
declare function getOriginalVideoFileTotalFromUser(user: MUserId): Promise<number>;
declare function getOriginalVideoFileTotalDailyFromUser(user: MUserId): Promise<number>;
declare function isUserQuotaValid(options: {
    userId: number;
    uploadSize: number;
    checkDaily?: boolean;
}): Promise<boolean>;
export { getOriginalVideoFileTotalFromUser, getOriginalVideoFileTotalDailyFromUser, createApplicationActor, createUserAccountAndChannelAndPlaylist, createLocalAccountWithoutKeys, sendVerifyUserEmail, sendVerifyRegistrationEmail, isUserQuotaValid, buildUser };
//# sourceMappingURL=user.d.ts.map