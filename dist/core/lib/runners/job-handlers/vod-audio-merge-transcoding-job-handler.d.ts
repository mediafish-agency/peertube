import { RunnerJobUpdatePayload, VODAudioMergeTranscodingSuccess } from '@peertube/peertube-models';
import { MVideo } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractVODTranscodingJobHandler } from './abstract-vod-transcoding-job-handler.js';
type CreateOptions = {
    video: MVideo;
    isNewVideo: boolean;
    resolution: number;
    fps: number;
    priority: number;
    deleteInputFileId: number | null;
    dependsOnRunnerJob?: MRunnerJob;
};
export declare class VODAudioMergeTranscodingJobHandler extends AbstractVODTranscodingJobHandler<CreateOptions, RunnerJobUpdatePayload, VODAudioMergeTranscodingSuccess> {
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: VODAudioMergeTranscodingSuccess;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=vod-audio-merge-transcoding-job-handler.d.ts.map