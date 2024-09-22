import { Transaction } from 'sequelize';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from '../video/video.js';
import { AutomaticTagModel } from './automatic-tag.js';
export declare class VideoAutomaticTagModel extends SequelizeModel<VideoAutomaticTagModel> {
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    automaticTagId: number;
    accountId: number;
    Account: Awaited<AccountModel>;
    AutomaticTag: Awaited<AutomaticTagModel>;
    Video: Awaited<VideoModel>;
    static deleteAllOfAccountAndVideo(options: {
        accountId: number;
        videoId: number;
        transaction: Transaction;
    }): Promise<number>;
}
//# sourceMappingURL=video-automatic-tag.d.ts.map