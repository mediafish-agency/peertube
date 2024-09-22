import { PeerTubeProblemDocument } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
type LoginOptions = OverrideCommandOptions & {
    client?: {
        id?: string;
        secret?: string;
    };
    user?: {
        username: string;
        password?: string;
    };
    otpToken?: string;
};
export declare class LoginCommand extends AbstractCommand {
    login(options?: LoginOptions): Promise<{
        access_token: string;
        refresh_token: string;
    } & PeerTubeProblemDocument>;
    loginAndGetResponse(options?: LoginOptions): Promise<{
        res: import("superagent/lib/node/response.js");
        body: {
            access_token: string;
            refresh_token: string;
        } & PeerTubeProblemDocument;
    }>;
    getAccessToken(arg1?: {
        username: string;
        password?: string;
    }): Promise<string>;
    getAccessToken(arg1: string, password?: string): Promise<string>;
    loginUsingExternalToken(options: OverrideCommandOptions & {
        username: string;
        externalAuthToken: string;
    }): import("supertest").Test;
    logout(options: OverrideCommandOptions & {
        token: string;
    }): Promise<{
        redirectUrl: string;
    }>;
    refreshToken(options: OverrideCommandOptions & {
        refreshToken: string;
    }): import("supertest").Test;
    getClient(options?: OverrideCommandOptions): Promise<{
        client_id: string;
        client_secret: string;
    }>;
    private _login;
    private unwrapLoginBody;
}
export {};
//# sourceMappingURL=login-command.d.ts.map