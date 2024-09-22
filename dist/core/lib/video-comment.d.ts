import { ResultList, VideoCommentThreadTree } from '@peertube/peertube-models';
import express from 'express';
import { Transaction } from 'sequelize';
import { MComment, MCommentFormattable, MCommentOwnerVideoReply, MUserAccountId, MVideoAccountLight, MVideoFullLight } from '../types/models/index.js';
export declare function removeComment(commentArg: MComment, req: express.Request, res: express.Response): Promise<void>;
export declare function approveComment(commentArg: MComment): Promise<void>;
export declare function createLocalVideoComment(options: {
    text: string;
    inReplyToComment: MComment | null;
    video: MVideoFullLight;
    user: MUserAccountId;
}): Promise<MCommentOwnerVideoReply>;
export declare function buildFormattedCommentTree(resultList: ResultList<MCommentFormattable>): VideoCommentThreadTree;
export declare function shouldCommentBeHeldForReview(options: {
    user: MUserAccountId;
    video: MVideoAccountLight;
    automaticTags: {
        name: string;
        accountId: number;
    }[];
    transaction?: Transaction;
}): Promise<boolean>;
//# sourceMappingURL=video-comment.d.ts.map