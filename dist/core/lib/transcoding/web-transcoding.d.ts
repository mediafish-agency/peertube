import { MVideoFile, MVideoFullLight } from '../../types/models/index.js';
import { Job } from 'bullmq';
export declare function optimizeOriginalVideofile(options: {
    video: MVideoFullLight;
    quickTranscode: boolean;
    job: Job;
}): Promise<{
    transcodeType: "video" | "quick-transcode";
    videoFile: MVideoFile;
}>;
export declare function transcodeNewWebVideoResolution(options: {
    video: MVideoFullLight;
    resolution: number;
    fps: number;
    job: Job;
}): Promise<{
    video: MVideoFullLight;
    videoFile: MVideoFile;
}>;
export declare function mergeAudioVideofile(options: {
    video: MVideoFullLight;
    resolution: number;
    fps: number;
    job: Job;
}): Promise<void>;
export declare function onWebVideoFileTranscoding(options: {
    video: MVideoFullLight;
    videoOutputPath: string;
    wasAudioFile?: boolean;
    deleteWebInputVideoFile?: MVideoFile;
}): Promise<{
    video: MVideoFullLight;
    videoFile: MVideoFile;
}>;
//# sourceMappingURL=web-transcoding.d.ts.map