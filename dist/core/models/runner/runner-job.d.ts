import { RunnerJob, RunnerJobAdmin, RunnerJobState, type RunnerJobPayload, type RunnerJobPrivatePayload, type RunnerJobStateType, type RunnerJobType } from '@peertube/peertube-models';
import { MRunnerJob, MRunnerJobRunner, MRunnerJobRunnerParent } from '../../types/models/runners/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { RunnerModel } from './runner.js';
export declare class RunnerJobModel extends SequelizeModel<RunnerJobModel> {
    uuid: string;
    type: RunnerJobType;
    payload: RunnerJobPayload;
    privatePayload: RunnerJobPrivatePayload;
    state: RunnerJobStateType;
    failures: number;
    error: string;
    priority: number;
    processingJobToken: string;
    progress: number;
    startedAt: Date;
    finishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    dependsOnRunnerJobId: number;
    DependsOnRunnerJob: Awaited<RunnerJobModel>;
    runnerId: number;
    Runner: Awaited<RunnerModel>;
    static loadWithRunner(uuid: string): Promise<MRunnerJobRunner>;
    static loadByRunnerAndJobTokensWithRunner(options: {
        uuid: string;
        runnerToken: string;
        jobToken: string;
    }): Promise<MRunnerJobRunner>;
    static listAvailableJobs(): Promise<MRunnerJob[]>;
    static listStalledJobs(options: {
        staleTimeMS: number;
        types: RunnerJobType[];
    }): Promise<MRunnerJob[]>;
    static listChildrenOf(job: MRunnerJob, transaction?: Transaction): Promise<MRunnerJob[]>;
    static listForApi(options: {
        start: number;
        count: number;
        sort: string;
        search?: string;
        stateOneOf?: RunnerJobStateType[];
    }): Promise<{
        total: number;
        data: MRunnerJobRunnerParent[];
    }>;
    static updateDependantJobsOf(runnerJob: MRunnerJob): Promise<[affectedCount: number]>;
    static cancelAllNonFinishedJobs(options: {
        type: RunnerJobType;
    }): Promise<[affectedCount: number]>;
    resetToPending(): void;
    setToErrorOrCancel(state: typeof RunnerJobState.PARENT_ERRORED | typeof RunnerJobState.ERRORED | typeof RunnerJobState.CANCELLED | typeof RunnerJobState.PARENT_CANCELLED): void;
    toFormattedJSON(this: MRunnerJobRunnerParent): RunnerJob;
    toFormattedAdminJSON(this: MRunnerJobRunnerParent): RunnerJobAdmin;
}
//# sourceMappingURL=runner-job.d.ts.map