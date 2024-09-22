import { MUserId, MVideoFile, MVideoFullLight } from '../../types/models/index.js';
export declare function createOptimizeOrMergeAudioJobs(options: {
    video: MVideoFullLight;
    videoFile: MVideoFile;
    isNewVideo: boolean;
    user: MUserId;
    videoFileAlreadyLocked: boolean;
}): Promise<void>;
export declare function createTranscodingJobs(options: {
    transcodingType: 'hls' | 'webtorrent' | 'web-video';
    video: MVideoFullLight;
    resolutions: number[];
    isNewVideo: boolean;
    user: MUserId;
}): Promise<void>;
//# sourceMappingURL=create-transcoding-job.d.ts.map