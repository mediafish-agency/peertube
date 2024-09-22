import { VideoStudioEditionPayload, VideoStudioTask, VideoStudioTaskPayload } from '@peertube/peertube-models';
import { MUser, MVideoFullLight, MVideoWithFile } from '../types/models/index.js';
export declare function buildTaskFileFieldname(indice: number, fieldName?: string): string;
export declare function getTaskFileFromReq(files: Express.Multer.File[], indice: number, fieldName?: string): Express.Multer.File;
export declare function getStudioTaskFilePath(filename: string): string;
export declare function safeCleanupStudioTMPFiles(tasks: VideoStudioTaskPayload[]): Promise<void>;
export declare function approximateIntroOutroAdditionalSize(video: MVideoFullLight, tasks: VideoStudioTask[], fileFinder: (i: number) => string): Promise<number>;
export declare function createVideoStudioJob(options: {
    video: MVideoWithFile;
    user: MUser;
    payload: VideoStudioEditionPayload;
}): Promise<void>;
export declare function onVideoStudioEnded(options: {
    editionResultPath: string;
    tasks: VideoStudioTaskPayload[];
    video: MVideoFullLight;
}): Promise<void>;
//# sourceMappingURL=video-studio.d.ts.map