import { RunnerJobStateType, RunnerJobUpdatePayload, VideoStudioTaskPayload, VideoStudioTranscodingSuccess } from '@peertube/peertube-models';
import { MVideoWithFile } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractJobHandler } from './abstract-job-handler.js';
type CreateOptions = {
    video: MVideoWithFile;
    tasks: VideoStudioTaskPayload[];
    priority: number;
};
export declare class VideoStudioTranscodingJobHandler extends AbstractJobHandler<CreateOptions, RunnerJobUpdatePayload, VideoStudioTranscodingSuccess> {
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected isAbortSupported(): boolean;
    protected specificUpdate(_options: {
        runnerJob: MRunnerJob;
    }): void;
    protected specificAbort(_options: {
        runnerJob: MRunnerJob;
    }): void;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: VideoStudioTranscodingSuccess;
    }): Promise<void>;
    protected specificError(options: {
        runnerJob: MRunnerJob;
        nextState: RunnerJobStateType;
    }): Promise<void>;
    protected specificCancel(options: {
        runnerJob: MRunnerJob;
    }): Promise<void>;
    private specificErrorOrCancel;
}
export {};
//# sourceMappingURL=video-studio-transcoding-job-handler.d.ts.map