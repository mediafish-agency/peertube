import { VODAudioMergeTranscodingJobHandler, VODHLSTranscodingJobHandler, VODWebVideoTranscodingJobHandler } from '../../../runners/job-handlers/index.js';
import { MUserId, MVideo, MVideoFile, MVideoFullLight } from '../../../../types/models/index.js';
import { AbstractJobBuilder } from './abstract-job-builder.js';
type Payload = {
    Builder: new () => VODHLSTranscodingJobHandler;
    options: Omit<Parameters<VODHLSTranscodingJobHandler['create']>[0], 'priority'>;
} | {
    Builder: new () => VODAudioMergeTranscodingJobHandler;
    options: Omit<Parameters<VODAudioMergeTranscodingJobHandler['create']>[0], 'priority'>;
} | {
    Builder: new () => VODWebVideoTranscodingJobHandler;
    options: Omit<Parameters<VODWebVideoTranscodingJobHandler['create']>[0], 'priority'>;
};
export declare class TranscodingRunnerJobBuilder extends AbstractJobBuilder<Payload> {
    protected createJobs(options: {
        video: MVideo;
        parent: Payload;
        children: Payload[][];
        user: MUserId | null;
    }): Promise<void>;
    private createJob;
    protected buildHLSJobPayload(options: {
        video: MVideoFullLight;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
        separatedAudio: boolean;
        deleteWebVideoFiles?: boolean;
        copyCodecs?: boolean;
    }): Payload;
    protected buildWebVideoJobPayload(options: {
        video: MVideoFullLight;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
    }): Payload;
    protected buildMergeAudioPayload(options: {
        video: MVideoFullLight;
        inputFile: MVideoFile;
        isNewVideo: boolean;
        fps: number;
        resolution: number;
    }): Payload;
    protected buildOptimizePayload(options: {
        video: MVideoFullLight;
        inputFile: MVideoFile;
        quickTranscode: boolean;
        isNewVideo: boolean;
        fps: number;
        resolution: number;
    }): Payload;
}
export {};
//# sourceMappingURL=transcoding-runner-job-builder.d.ts.map