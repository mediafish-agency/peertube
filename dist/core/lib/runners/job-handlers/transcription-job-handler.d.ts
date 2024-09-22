import { RunnerJobStateType, RunnerJobUpdatePayload, TranscriptionSuccess } from '@peertube/peertube-models';
import { MVideoUUID } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractJobHandler } from './abstract-job-handler.js';
type CreateOptions = {
    video: MVideoUUID;
};
export declare class TranscriptionJobHandler extends AbstractJobHandler<CreateOptions, RunnerJobUpdatePayload, TranscriptionSuccess> {
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
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: TranscriptionSuccess;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=transcription-job-handler.d.ts.map