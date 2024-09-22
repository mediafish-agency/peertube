import { MRunnerRegistrationToken } from '../../types/models/runners/index.js';
import { RunnerRegistrationToken } from '@peertube/peertube-models';
import { SequelizeModel } from '../shared/index.js';
import { RunnerModel } from './runner.js';
export declare class RunnerRegistrationTokenModel extends SequelizeModel<RunnerRegistrationTokenModel> {
    registrationToken: string;
    createdAt: Date;
    updatedAt: Date;
    Runners: Awaited<RunnerModel>[];
    static load(id: number): Promise<RunnerRegistrationTokenModel>;
    static loadByRegistrationToken(registrationToken: string): Promise<RunnerRegistrationTokenModel>;
    static countTotal(): Promise<number>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: MRunnerRegistrationToken[];
    }>;
    toFormattedJSON(this: MRunnerRegistrationToken): RunnerRegistrationToken;
}
//# sourceMappingURL=runner-registration-token.d.ts.map