import { VideoPrivacyType, VideoStateType } from '@peertube/peertube-models';
import { MVideo, MVideoFile, MVideoFullLight, MVideoUUID } from '../types/models/index.js';
export declare function buildMoveJob(options: {
    video: MVideoUUID;
    previousVideoState: VideoStateType;
    type: 'move-to-object-storage' | 'move-to-file-system';
    isNewVideo?: boolean;
}): Promise<{
    type: "move-to-object-storage" | "move-to-file-system";
    payload: {
        videoUUID: string;
        isNewVideo: boolean;
        previousVideoState: VideoStateType;
    };
}>;
export declare function buildStoryboardJobIfNeeded(options: {
    video: MVideo;
    federate: boolean;
}): {
    type: "generate-video-storyboard";
    payload: {
        videoUUID: string;
        federate: boolean;
        isNewVideoForFederation?: undefined;
    };
} | {
    type: "federate-video";
    payload: {
        videoUUID: string;
        isNewVideoForFederation: boolean;
        federate?: undefined;
    };
};
export declare function addVideoJobsAfterCreation(options: {
    video: MVideo;
    videoFile: MVideoFile;
    generateTranscription: boolean;
}): Promise<void>;
export declare function addVideoJobsAfterUpdate(options: {
    video: MVideoFullLight;
    isNewVideoForFederation: boolean;
    nameChanged: boolean;
    oldPrivacy: VideoPrivacyType;
}): Promise<import("bullmq").JobNode>;
//# sourceMappingURL=video-jobs.d.ts.map