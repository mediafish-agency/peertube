import { VideoModel } from './video.js';
import { ResultList, VideoPassword } from '@peertube/peertube-models';
import { SequelizeModel } from '../shared/index.js';
import { Transaction } from 'sequelize';
import { MVideoPassword } from '../../types/models/index.js';
export declare class VideoPasswordModel extends SequelizeModel<VideoPasswordModel> {
    password: string;
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    Video: Awaited<VideoModel>;
    static countByVideoId(videoId: number, t?: Transaction): Promise<number>;
    static loadByIdAndVideo(options: {
        id: number;
        videoId: number;
        t?: Transaction;
    }): Promise<MVideoPassword>;
    static listPasswords(options: {
        start: number;
        count: number;
        sort: string;
        videoId: number;
    }): Promise<ResultList<MVideoPassword>>;
    static addPasswords(passwords: string[], videoId: number, transaction?: Transaction): Promise<void>;
    static deleteAllPasswords(videoId: number, transaction?: Transaction): Promise<void>;
    static deletePassword(passwordId: number, transaction?: Transaction): Promise<void>;
    static isACorrectPassword(options: {
        videoId: number;
        password: string;
    }): Promise<VideoPasswordModel>;
    toFormattedJSON(): VideoPassword;
}
//# sourceMappingURL=video-password.d.ts.map