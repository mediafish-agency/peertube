import { HLSTranscodingPayload, MergeAudioTranscodingPayload, NewWebVideoResolutionTranscodingPayload, OptimizeTranscodingPayload } from '@peertube/peertube-models';
import { MUserId, MVideo } from '../../../../types/models/index.js';
import { AbstractJobBuilder } from './abstract-job-builder.js';
type Payload = MergeAudioTranscodingPayload | OptimizeTranscodingPayload | NewWebVideoResolutionTranscodingPayload | HLSTranscodingPayload;
export declare class TranscodingJobQueueBuilder extends AbstractJobBuilder<Payload> {
    protected createJobs(options: {
        video: MVideo;
        parent: Payload;
        children: Payload[][];
        user: MUserId | null;
    }): Promise<void>;
    private buildTranscodingJob;
    protected buildHLSJobPayload(options: {
        video: MVideo;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
        separatedAudio: boolean;
        deleteWebVideoFiles?: boolean;
        copyCodecs?: boolean;
    }): HLSTranscodingPayload;
    protected buildWebVideoJobPayload(options: {
        video: MVideo;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
    }): NewWebVideoResolutionTranscodingPayload;
    protected buildMergeAudioPayload(options: {
        video: MVideo;
        isNewVideo: boolean;
        fps: number;
        resolution: number;
    }): MergeAudioTranscodingPayload;
    protected buildOptimizePayload(options: {
        video: MVideo;
        quickTranscode: boolean;
        isNewVideo: boolean;
    }): OptimizeTranscodingPayload;
}
export {};
//# sourceMappingURL=transcoding-job-queue-builder.d.ts.map