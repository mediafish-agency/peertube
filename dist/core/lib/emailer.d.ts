import { EmailPayload } from '@peertube/peertube-models';
import { MRegistration, MUser, MUserExport, MUserImport } from '../types/models/index.js';
declare class Emailer {
    private static instance;
    private initialized;
    private transporter;
    private constructor();
    init(): void;
    checkConnection(): Promise<void>;
    addPasswordResetEmailJob(username: string, to: string, resetPasswordUrl: string): void;
    addPasswordCreateEmailJob(username: string, to: string, createPasswordUrl: string): void;
    addVerifyEmailJob(options: {
        username: string;
        isRegistrationRequest: boolean;
        to: string;
        verifyEmailUrl: string;
    }): void;
    addUserBlockJob(user: MUser, blocked: boolean, reason?: string): void;
    addContactFormJob(fromEmail: string, fromName: string, subject: string, body: string): void;
    addUserRegistrationRequestProcessedJob(registration: MRegistration): void;
    addUserExportCompletedOrErroredJob(userExport: MUserExport): Promise<void>;
    addUserImportErroredJob(userImport: MUserImport): Promise<void>;
    addUserImportSuccessJob(userImport: MUserImport): Promise<void>;
    sendMail(options: EmailPayload): Promise<void>;
    private warnOnConnectionFailure;
    private initSMTPTransport;
    private initSendmailTransport;
    static get Instance(): Emailer;
}
export { Emailer };
//# sourceMappingURL=emailer.d.ts.map