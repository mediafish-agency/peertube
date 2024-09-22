import { Transaction } from 'sequelize';
import { ResultList } from '@peertube/peertube-models';
import { MUserAccountId, MUserId } from '../../types/models/index.js';
import { VideoModel } from '../video/video.js';
import { UserModel } from './user.js';
import { SequelizeModel } from '../shared/sequelize-type.js';
export declare class UserVideoHistoryModel extends SequelizeModel<UserVideoHistoryModel> {
    createdAt: Date;
    updatedAt: Date;
    currentTime: number;
    videoId: number;
    Video: Awaited<VideoModel>;
    userId: number;
    User: Awaited<UserModel>;
    static listForApi(user: MUserAccountId, start: number, count: number, search?: string): Promise<ResultList<VideoModel>>;
    static listForExport(user: MUserId): Promise<{
        createdAt: Date;
        updatedAt: Date;
        currentTime: number;
        videoUrl: string;
    }[]>;
    static removeUserHistoryElement(user: MUserId, videoId: number): Promise<number>;
    static removeUserHistoryBefore(user: MUserId, beforeDate: string, t: Transaction): Promise<number>;
    static removeOldHistory(beforeDate: string): Promise<number>;
}
//# sourceMappingURL=user-video-history.d.ts.map