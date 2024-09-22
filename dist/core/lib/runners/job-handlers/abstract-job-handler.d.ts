import { RunnerJobLiveRTMPHLSTranscodingPayload, RunnerJobLiveRTMPHLSTranscodingPrivatePayload, RunnerJobStateType, RunnerJobStudioTranscodingPayload, RunnerJobSuccessPayload, RunnerJobTranscriptionPayload, RunnerJobTranscriptionPrivatePayload, RunnerJobType, RunnerJobUpdatePayload, RunnerJobVODAudioMergeTranscodingPayload, RunnerJobVODAudioMergeTranscodingPrivatePayload, RunnerJobVODHLSTranscodingPayload, RunnerJobVODHLSTranscodingPrivatePayload, RunnerJobVODWebVideoTranscodingPayload, RunnerJobVODWebVideoTranscodingPrivatePayload, RunnerJobVideoStudioTranscodingPrivatePayload } from '@peertube/peertube-models';
import { setAsUpdated } from '../../../models/shared/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
type CreateRunnerJobArg = {
    type: Extract<RunnerJobType, 'vod-web-video-transcoding'>;
    payload: RunnerJobVODWebVideoTranscodingPayload;
    privatePayload: RunnerJobVODWebVideoTranscodingPrivatePayload;
} | {
    type: Extract<RunnerJobType, 'vod-hls-transcoding'>;
    payload: RunnerJobVODHLSTranscodingPayload;
    privatePayload: RunnerJobVODHLSTranscodingPrivatePayload;
} | {
    type: Extract<RunnerJobType, 'vod-audio-merge-transcoding'>;
    payload: RunnerJobVODAudioMergeTranscodingPayload;
    privatePayload: RunnerJobVODAudioMergeTranscodingPrivatePayload;
} | {
    type: Extract<RunnerJobType, 'live-rtmp-hls-transcoding'>;
    payload: RunnerJobLiveRTMPHLSTranscodingPayload;
    privatePayload: RunnerJobLiveRTMPHLSTranscodingPrivatePayload;
} | {
    type: Extract<RunnerJobType, 'video-studio-transcoding'>;
    payload: RunnerJobStudioTranscodingPayload;
    privatePayload: RunnerJobVideoStudioTranscodingPrivatePayload;
} | {
    type: Extract<RunnerJobType, 'video-transcription'>;
    payload: RunnerJobTranscriptionPayload;
    privatePayload: RunnerJobTranscriptionPrivatePayload;
};
export declare abstract class AbstractJobHandler<C, U extends RunnerJobUpdatePayload, S extends RunnerJobSuccessPayload> {
    protected readonly lTags: import("../../../helpers/logger.js").LoggerTagsFn;
    static setJobAsUpdatedThrottled: import("lodash").DebouncedFuncLeading<typeof setAsUpdated>;
    abstract create(options: C): Promise<MRunnerJob>;
    protected createRunnerJob(options: CreateRunnerJobArg & {
        jobUUID: string;
        priority: number;
        dependsOnRunnerJob?: MRunnerJob;
    }): Promise<MRunnerJob>;
    protected abstract specificUpdate(options: {
        runnerJob: MRunnerJob;
        updatePayload?: U;
    }): Promise<void> | void;
    update(options: {
        runnerJob: MRunnerJob;
        progress?: number;
        updatePayload?: U;
    }): Promise<void>;
    complete(options: {
        runnerJob: MRunnerJob;
        resultPayload: S;
    }): Promise<void>;
    protected abstract specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: S;
    }): Promise<void> | void;
    cancel(options: {
        runnerJob: MRunnerJob;
        fromParent?: boolean;
    }): Promise<void>;
    protected abstract specificCancel(options: {
        runnerJob: MRunnerJob;
    }): Promise<void> | void;
    protected abstract isAbortSupported(): boolean;
    abort(options: {
        runnerJob: MRunnerJob;
        abortNotSupportedErrorMessage?: string;
    }): Promise<void>;
    protected setAbortState(runnerJob: MRunnerJob): void;
    protected abstract specificAbort(options: {
        runnerJob: MRunnerJob;
    }): Promise<void> | void;
    error(options: {
        runnerJob: MRunnerJob;
        message: string;
        fromParent?: boolean;
    }): Promise<void>;
    protected abstract specificError(options: {
        runnerJob: MRunnerJob;
        message: string;
        nextState: RunnerJobStateType;
    }): Promise<void> | void;
}
export {};
//# sourceMappingURL=abstract-job-handler.d.ts.map