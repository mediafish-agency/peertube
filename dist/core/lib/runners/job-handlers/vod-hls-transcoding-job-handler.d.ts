import { RunnerJobUpdatePayload, VODHLSTranscodingSuccess } from '@peertube/peertube-models';
import { MVideoWithFile } from '../../../types/models/index.js';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractVODTranscodingJobHandler } from './abstract-vod-transcoding-job-handler.js';
type CreateOptions = {
    video: MVideoWithFile;
    isNewVideo: boolean;
    deleteWebVideoFiles: boolean;
    resolution: number;
    fps: number;
    priority: number;
    separatedAudio: boolean;
    dependsOnRunnerJob?: MRunnerJob;
};
export declare class VODHLSTranscodingJobHandler extends AbstractVODTranscodingJobHandler<CreateOptions, RunnerJobUpdatePayload, VODHLSTranscodingSuccess> {
    create(options: CreateOptions): Promise<MRunnerJob>;
    protected specificComplete(options: {
        runnerJob: MRunnerJob;
        resultPayload: VODHLSTranscodingSuccess;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=vod-hls-transcoding-job-handler.d.ts.map