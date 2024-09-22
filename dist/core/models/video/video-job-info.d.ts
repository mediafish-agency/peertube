import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/sequelize-type.js';
import { VideoModel } from './video.js';
export type VideoJobInfoColumnType = 'pendingMove' | 'pendingTranscode' | 'pendingTranscription';
export declare class VideoJobInfoModel extends SequelizeModel<VideoJobInfoModel> {
    createdAt: Date;
    updatedAt: Date;
    pendingMove: number;
    pendingTranscode: number;
    pendingTranscription: number;
    videoId: number;
    Video: Awaited<VideoModel>;
    static load(videoId: number, transaction?: Transaction): Promise<VideoJobInfoModel>;
    static increaseOrCreate(videoUUID: string, column: VideoJobInfoColumnType, amountArg?: number): Promise<number>;
    static decrease(videoUUID: string, column: VideoJobInfoColumnType): Promise<number>;
    static abortAllTasks(videoUUID: string, column: VideoJobInfoColumnType): Promise<void>;
}
//# sourceMappingURL=video-job-info.d.ts.map