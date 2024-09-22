import { LoggerTagsFn } from '../../../../helpers/logger.js';
import { MVideoFullLight } from '../../../../types/models/index.js';
import { MRunnerJob } from '../../../../types/models/runners/index.js';
import { RunnerJobVODAudioMergeTranscodingPrivatePayload, RunnerJobVODWebVideoTranscodingPrivatePayload } from '@peertube/peertube-models';
export declare function onVODWebVideoOrAudioMergeTranscodingJob(options: {
    video: MVideoFullLight;
    videoFilePath: string;
    privatePayload: RunnerJobVODWebVideoTranscodingPrivatePayload | RunnerJobVODAudioMergeTranscodingPrivatePayload;
    wasAudioFile: boolean;
}): Promise<void>;
export declare function loadRunnerVideo(runnerJob: MRunnerJob, lTags: LoggerTagsFn): Promise<MVideoFullLight>;
//# sourceMappingURL=utils.d.ts.map