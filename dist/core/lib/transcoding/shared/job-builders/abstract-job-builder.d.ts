import { MUserId, MVideoFile, MVideoFullLight } from '../../../../types/models/index.js';
export declare abstract class AbstractJobBuilder<P> {
    createOptimizeOrMergeAudioJobs(options: {
        video: MVideoFullLight;
        videoFile: MVideoFile;
        isNewVideo: boolean;
        user: MUserId;
        videoFileAlreadyLocked: boolean;
    }): Promise<void>;
    createTranscodingJobs(options: {
        transcodingType: 'hls' | 'webtorrent' | 'web-video';
        video: MVideoFullLight;
        resolutions: number[];
        isNewVideo: boolean;
        user: MUserId | null;
    }): Promise<void>;
    private buildLowerResolutionJobPayloads;
    protected abstract createJobs(options: {
        video: MVideoFullLight;
        parent: P;
        children: P[][];
        user: MUserId | null;
    }): Promise<void>;
    protected abstract buildMergeAudioPayload(options: {
        video: MVideoFullLight;
        inputFile: MVideoFile;
        isNewVideo: boolean;
        resolution: number;
        fps: number;
    }): P;
    protected abstract buildOptimizePayload(options: {
        video: MVideoFullLight;
        isNewVideo: boolean;
        quickTranscode: boolean;
        inputFile: MVideoFile;
        resolution: number;
        fps: number;
    }): P;
    protected abstract buildHLSJobPayload(options: {
        video: MVideoFullLight;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
        separatedAudio: boolean;
        deleteWebVideoFiles?: boolean;
        copyCodecs?: boolean;
    }): P;
    protected abstract buildWebVideoJobPayload(options: {
        video: MVideoFullLight;
        resolution: number;
        fps: number;
        isNewVideo: boolean;
    }): P;
}
//# sourceMappingURL=abstract-job-builder.d.ts.map