import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoCommentModel } from '../video/video-comment.js';
import { AutomaticTagModel } from './automatic-tag.js';
import { Transaction } from 'sequelize';
export declare class CommentAutomaticTagModel extends SequelizeModel<CommentAutomaticTagModel> {
    createdAt: Date;
    updatedAt: Date;
    commentId: number;
    automaticTagId: number;
    accountId: number;
    Account: Awaited<AccountModel>;
    AutomaticTag: Awaited<AutomaticTagModel>;
    VideoComment: Awaited<VideoCommentModel>;
    static deleteAllOfAccountAndComment(options: {
        accountId: number;
        commentId: number;
        transaction: Transaction;
    }): Promise<number>;
}
//# sourceMappingURL=comment-automatic-tag.d.ts.map