import { LiveRTMPHLSTranscodingSuccess, LiveRTMPHLSTranscodingUpdatePayload, RunnerJobStateType } from '@peertube/peertube-models';
import { MStreamingPlaylist, MVideo } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractJobHandler } from './abstract-job-handler.js';
type CreateOptions = {
    video: MVideo;
    playlist: MStreamingPlaylist;
    sessionId: string;
    rtmpUrl: string;
    toTranscode: {
        resolution: number;
        fps: number;
    }[];
    segmentListSize: number;
    segmentDuration: number;
    outputDirectory: string;
};
export declare class LiveRTMPHLSTranscodingJobHandler extends AbstractJobHandler<CreateOptions, LiveRTMPHLSTranscodingUpdatePayload, LiveRTMPHLSTranscodingSuccess> {
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected specificUpdate(options: {
        runnerJob: MRunnerJob;
        updatePayload: LiveRTMPHLSTranscodingUpdatePayload;
    }): Promise<void>;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
    }): void;
    protected isAbortSupported(): boolean;
    protected specificAbort(): void;
    protected specificError(options: {
        runnerJob: MRunnerJob;
        nextState: RunnerJobStateType;
    }): void;
    protected specificCancel(options: {
        runnerJob: MRunnerJob;
    }): void;
    private stopLive;
}
export {};
//# sourceMappingURL=live-rtmp-hls-transcoding-job-handler.d.ts.map