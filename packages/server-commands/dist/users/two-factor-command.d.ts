import { TOTP } from 'otpauth';
import { TwoFactorEnableResult } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class TwoFactorCommand extends AbstractCommand {
    static buildOTP(options: {
        secret: string;
    }): TOTP;
    request(options: OverrideCommandOptions & {
        userId: number;
        currentPassword?: string;
    }): Promise<TwoFactorEnableResult>;
    confirmRequest(options: OverrideCommandOptions & {
        userId: number;
        requestToken: string;
        otpToken: string;
    }): import("supertest").Test;
    disable(options: OverrideCommandOptions & {
        userId: number;
        currentPassword?: string;
    }): import("supertest").Test;
    requestAndConfirm(options: OverrideCommandOptions & {
        userId: number;
        currentPassword?: string;
    }): Promise<{
        requestToken: string;
        secret: string;
        uri: string;
    }>;
}
//# sourceMappingURL=two-factor-command.d.ts.map