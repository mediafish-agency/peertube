import { AutomaticTagPolicyType } from '@peertube/peertube-models';
import { MAccountId, MComment, MVideo } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
export declare function setAndSaveCommentAutomaticTags(options: {
    comment: MComment;
    automaticTags: {
        accountId: number;
        name: string;
    }[];
    transaction?: Transaction;
}): Promise<void>;
export declare function setAndSaveVideoAutomaticTags(options: {
    video: MVideo;
    automaticTags: {
        accountId: number;
        name: string;
    }[];
    transaction?: Transaction;
}): Promise<void>;
export declare function setAccountAutomaticTagsPolicy(options: {
    account: MAccountId;
    tags: string[];
    policy: AutomaticTagPolicyType;
    transaction?: Transaction;
}): Promise<void>;
//# sourceMappingURL=automatic-tags.d.ts.map