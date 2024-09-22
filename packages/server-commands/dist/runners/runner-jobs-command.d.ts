import { AbortRunnerJobBody, AcceptRunnerJobBody, AcceptRunnerJobResult, ErrorRunnerJobBody, ListRunnerJobsQuery, RequestRunnerJobBody, RequestRunnerJobResult, ResultList, RunnerJobAdmin, RunnerJobLiveRTMPHLSTranscodingPayload, RunnerJobPayload, RunnerJobStateType, RunnerJobSuccessBody, RunnerJobType, RunnerJobUpdateBody, RunnerJobVODPayload } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class RunnerJobsCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & ListRunnerJobsQuery): Promise<ResultList<RunnerJobAdmin<RunnerJobPayload, import("@peertube/peertube-models").RunnerJobPrivatePayload>>>;
    cancelByAdmin(options: OverrideCommandOptions & {
        jobUUID: string;
    }): import("supertest").Test;
    deleteByAdmin(options: OverrideCommandOptions & {
        jobUUID: string;
    }): import("supertest").Test;
    request(options: OverrideCommandOptions & RequestRunnerJobBody): Promise<RequestRunnerJobResult<RunnerJobPayload>>;
    requestVOD(options: OverrideCommandOptions & RequestRunnerJobBody): Promise<RequestRunnerJobResult<RunnerJobVODPayload>>;
    requestLive(options: OverrideCommandOptions & RequestRunnerJobBody): Promise<RequestRunnerJobResult<RunnerJobLiveRTMPHLSTranscodingPayload>>;
    accept<T extends RunnerJobPayload = RunnerJobPayload>(options: OverrideCommandOptions & AcceptRunnerJobBody & {
        jobUUID: string;
    }): Promise<AcceptRunnerJobResult<T>>;
    abort(options: OverrideCommandOptions & AbortRunnerJobBody & {
        jobUUID: string;
    }): import("supertest").Test;
    update(options: OverrideCommandOptions & RunnerJobUpdateBody & {
        jobUUID: string;
    }): import("supertest").SuperTestStatic.Test;
    error(options: OverrideCommandOptions & ErrorRunnerJobBody & {
        jobUUID: string;
    }): import("supertest").Test;
    success(options: OverrideCommandOptions & RunnerJobSuccessBody & {
        jobUUID: string;
    }): import("supertest").SuperTestStatic.Test;
    getJobFile(options: OverrideCommandOptions & {
        url: string;
        jobToken: string;
        runnerToken: string;
    }): import("supertest").Test;
    autoAccept(options: OverrideCommandOptions & RequestRunnerJobBody & {
        type?: RunnerJobType;
    }): Promise<AcceptRunnerJobResult<RunnerJobPayload>>;
    autoProcessWebVideoJob(runnerToken: string, jobUUIDToProcess?: string): Promise<import("@peertube/peertube-models").RunnerJob<RunnerJobPayload> & {
        jobToken: string;
    }>;
    cancelAllJobs(options?: {
        state?: RunnerJobStateType;
    }): Promise<void>;
    getJob(options: OverrideCommandOptions & {
        uuid: string;
    }): Promise<RunnerJobAdmin<RunnerJobPayload, import("@peertube/peertube-models").RunnerJobPrivatePayload>>;
    requestLiveJob(runnerToken: string): Promise<{
        uuid: string;
        type: RunnerJobType;
        payload: RunnerJobLiveRTMPHLSTranscodingPayload;
    }>;
}
//# sourceMappingURL=runner-jobs-command.d.ts.map