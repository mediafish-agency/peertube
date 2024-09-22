import { ResultList, RunnerRegistrationToken } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class RunnerRegistrationTokensCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<RunnerRegistrationToken>>;
    generate(options?: OverrideCommandOptions): import("supertest").Test;
    delete(options: OverrideCommandOptions & {
        id: number;
    }): import("supertest").Test;
    getFirstRegistrationToken(options?: OverrideCommandOptions): Promise<string>;
}
//# sourceMappingURL=runner-registration-tokens-command.d.ts.map