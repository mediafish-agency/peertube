import { RegisterRunnerBody, RegisterRunnerResult, ResultList, Runner, UnregisterRunnerBody } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class RunnersCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<Runner>>;
    register(options: OverrideCommandOptions & RegisterRunnerBody): Promise<RegisterRunnerResult>;
    unregister(options: OverrideCommandOptions & UnregisterRunnerBody): import("supertest").Test;
    delete(options: OverrideCommandOptions & {
        id: number;
    }): import("supertest").Test;
    autoRegisterRunner(): Promise<string>;
}
//# sourceMappingURL=runners-command.d.ts.map