import { RunnerJobStateType, RunnerJobSuccessPayload, RunnerJobUpdatePayload } from '@peertube/peertube-models';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractJobHandler } from './abstract-job-handler.js';
export declare abstract class AbstractVODTranscodingJobHandler<C, U extends RunnerJobUpdatePayload, S extends RunnerJobSuccessPayload> extends AbstractJobHandler<C, U, S> {
    protected isAbortSupported(): boolean;
    protected specificUpdate(_options: {
        runnerJob: MRunnerJob;
    }): void;
    protected specificAbort(_options: {
        runnerJob: MRunnerJob;
    }): void;
    protected specificError(options: {
        runnerJob: MRunnerJob;
        nextState: RunnerJobStateType;
    }): Promise<void>;
    protected specificCancel(options: {
        runnerJob: MRunnerJob;
    }): Promise<void>;
}
//# sourceMappingURL=abstract-vod-transcoding-job-handler.d.ts.map