import { ServerFilterHookName } from '@peertube/peertube-models';
import { MUserAccountId, MVideo } from '../../../../types/models/index.js';
import express from 'express';
export declare function commonVideoFileChecks(options: {
    res: express.Response;
    user: MUserAccountId;
    videoFileSize: number;
    files: express.UploadFilesForCheck;
}): Promise<boolean>;
export declare function isVideoFileAccepted(options: {
    req: express.Request;
    res: express.Response;
    videoFile: express.VideoLegacyUploadFile;
    hook: Extract<ServerFilterHookName, 'filter:api.video.upload.accept.result' | 'filter:api.video.update-file.accept.result'>;
}): Promise<boolean>;
export declare function checkVideoFileCanBeEdited(video: MVideo, res: express.Response): boolean;
export declare function checkVideoCanBeTranscribedOrTranscripted(video: MVideo, res: express.Response): boolean;
//# sourceMappingURL=video-validators.d.ts.map