import { MAutomaticTag } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { AccountAutomaticTagPolicyModel } from './account-automatic-tag-policy.js';
import { CommentAutomaticTagModel } from './comment-automatic-tag.js';
import { VideoAutomaticTagModel } from './video-automatic-tag.js';
export declare class AutomaticTagModel extends SequelizeModel<AutomaticTagModel> {
    name: string;
    CommentAutomaticTags: Awaited<CommentAutomaticTagModel>[];
    VideoAutomaticTags: Awaited<VideoAutomaticTagModel>[];
    AccountAutomaticTagPolicies: Awaited<AccountAutomaticTagPolicyModel>[];
    static findOrCreateAutomaticTag(options: {
        tag: string;
        transaction?: Transaction;
    }): Promise<MAutomaticTag>;
}
//# sourceMappingURL=automatic-tag.d.ts.map