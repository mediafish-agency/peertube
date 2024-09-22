import { MRunner } from '../../types/models/runners/index.js';
import { Runner } from '@peertube/peertube-models';
import { SequelizeModel } from '../shared/index.js';
import { RunnerRegistrationTokenModel } from './runner-registration-token.js';
export declare class RunnerModel extends SequelizeModel<RunnerModel> {
    runnerToken: string;
    name: string;
    description: string;
    lastContact: Date;
    ip: string;
    createdAt: Date;
    updatedAt: Date;
    runnerRegistrationTokenId: number;
    RunnerRegistrationToken: Awaited<RunnerRegistrationTokenModel>;
    static load(id: number): Promise<RunnerModel>;
    static loadByToken(runnerToken: string): Promise<RunnerModel>;
    static loadByName(name: string): Promise<RunnerModel>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: MRunner[];
    }>;
    toFormattedJSON(this: MRunner): Runner;
}
//# sourceMappingURL=runner.d.ts.map