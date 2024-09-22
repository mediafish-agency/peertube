import { LoggerTags } from '../../../../helpers/logger.js';
import { MVideoWithAllFiles } from '../../../../types/models/index.js';
import { MVideoSource } from '../../../../types/models/video/video-source.js';
export declare function moveToJob(options: {
    jobId: string;
    videoUUID: string;
    loggerTags: (number | string)[];
    moveWebVideoFiles: (video: MVideoWithAllFiles) => Promise<void>;
    moveHLSFiles: (video: MVideoWithAllFiles) => Promise<void>;
    moveVideoSourceFile: (source: MVideoSource) => Promise<void>;
    moveToFailedState: (video: MVideoWithAllFiles) => Promise<void>;
    doAfterLastMove: (video: MVideoWithAllFiles) => Promise<void>;
}): Promise<any>;
export declare function onMoveToStorageFailure(options: {
    videoUUID: string;
    err: any;
    lTags: LoggerTags;
    moveToFailedState: (video: MVideoWithAllFiles) => Promise<void>;
}): Promise<void>;
//# sourceMappingURL=move-video.d.ts.map