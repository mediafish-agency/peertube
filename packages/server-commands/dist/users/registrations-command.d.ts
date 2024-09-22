import { ResultList, UserRegistration, UserRegistrationRequest, UserRegistrationUpdateState } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class RegistrationsCommand extends AbstractCommand {
    register(options: OverrideCommandOptions & Partial<UserRegistrationRequest> & Pick<UserRegistrationRequest, 'username'>): import("supertest").Test;
    requestRegistration(options: OverrideCommandOptions & Partial<UserRegistrationRequest> & Pick<UserRegistrationRequest, 'username' | 'registrationReason'>): Promise<UserRegistration>;
    accept(options: OverrideCommandOptions & {
        id: number;
    } & UserRegistrationUpdateState): import("supertest").Test;
    reject(options: OverrideCommandOptions & {
        id: number;
    } & UserRegistrationUpdateState): import("supertest").Test;
    delete(options: OverrideCommandOptions & {
        id: number;
    }): import("supertest").Test;
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
    }): Promise<ResultList<UserRegistration>>;
    askSendVerifyEmail(options: OverrideCommandOptions & {
        email: string;
    }): import("supertest").Test;
    verifyEmail(options: OverrideCommandOptions & {
        registrationId: number;
        verificationString: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=registrations-command.d.ts.map