import { Transaction } from 'sequelize';
import { VideoStateType } from '@peertube/peertube-models';
import { MVideo, MVideoFullLight, MVideoUUID } from '../types/models/index.js';
declare function buildNextVideoState(currentState?: VideoStateType): 1 | 2 | 6;
declare function moveToNextState(options: {
    video: MVideoUUID;
    previousVideoState?: VideoStateType;
    isNewVideo?: boolean;
}): Promise<boolean | void>;
declare function moveToExternalStorageState(options: {
    video: MVideoFullLight;
    isNewVideo: boolean;
    transaction: Transaction;
}): Promise<boolean>;
declare function moveToFileSystemState(options: {
    video: MVideoFullLight;
    isNewVideo: boolean;
    transaction: Transaction;
}): Promise<boolean>;
declare function moveToFailedTranscodingState(video: MVideo): Promise<void>;
declare function moveToFailedMoveToObjectStorageState(video: MVideo): Promise<void>;
declare function moveToFailedMoveToFileSystemState(video: MVideo): Promise<void>;
export { buildNextVideoState, moveToFailedMoveToFileSystemState, moveToExternalStorageState, moveToFileSystemState, moveToFailedTranscodingState, moveToFailedMoveToObjectStorageState, moveToNextState };
//# sourceMappingURL=video-state.d.ts.map