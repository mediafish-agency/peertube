import { UserRegistration, type UserRegistrationStateType } from '@peertube/peertube-models';
import { MRegistration, MRegistrationFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { UserModel } from './user.js';
export declare class UserRegistrationModel extends SequelizeModel<UserRegistrationModel> {
    state: UserRegistrationStateType;
    registrationReason: string;
    moderationResponse: string;
    password: string;
    username: string;
    email: string;
    emailVerified: boolean;
    accountDisplayName: string;
    channelHandle: string;
    channelDisplayName: string;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    User: Awaited<UserModel>;
    static cryptPasswordIfNeeded(instance: UserRegistrationModel): Promise<void>;
    static load(id: number): Promise<MRegistration>;
    static loadByEmail(email: string): Promise<MRegistration>;
    static loadByEmailOrUsername(emailOrUsername: string): Promise<MRegistration>;
    static loadByEmailOrHandle(options: {
        email: string;
        username: string;
        channelHandle?: string;
    }): Promise<MRegistration>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
        search?: string;
    }): Promise<{
        total: number;
        data: MRegistrationFormattable[];
    }>;
    static getStats(): Promise<{
        totalRegistrationRequests: number;
        totalRegistrationRequestsProcessed: number;
        averageRegistrationRequestResponseTimeMs: number;
    }>;
    toFormattedJSON(this: MRegistrationFormattable): UserRegistration;
}
//# sourceMappingURL=user-registration.d.ts.map