import { RunnerJobUpdatePayload, VODWebVideoTranscodingSuccess } from '@peertube/peertube-models';
import { MVideoWithFile } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractVODTranscodingJobHandler } from './abstract-vod-transcoding-job-handler.js';
type CreateOptions = {
    video: MVideoWithFile;
    isNewVideo: boolean;
    resolution: number;
    fps: number;
    priority: number;
    deleteInputFileId: number | null;
    dependsOnRunnerJob?: MRunnerJob;
};
export declare class VODWebVideoTranscodingJobHandler extends AbstractVODTranscodingJobHandler<CreateOptions, RunnerJobUpdatePayload, VODWebVideoTranscodingSuccess> {
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: VODWebVideoTranscodingSuccess;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=vod-web-video-transcoding-job-handler.d.ts.map