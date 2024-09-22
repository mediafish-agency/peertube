import { AutomaticTagAvailable, CommentAutomaticTagPolicies } from '@peertube/peertube-models';
import { MAccount, MAccountId, MVideo } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
export declare class AutomaticTagger {
    private static readonly SPECIAL_TAGS;
    buildCommentsAutomaticTags(options: {
        ownerAccount: MAccount;
        text: string;
        transaction?: Transaction;
    }): Promise<{
        name: string;
        accountId: number;
    }[]>;
    buildVideoAutomaticTags(options: {
        video: MVideo;
        transaction?: Transaction;
    }): Promise<{
        name: string;
        accountId: number;
    }[]>;
    private buildAutomaticTags;
    private hasExternalLinks;
    static getAutomaticTagPolicies(account: MAccountId): Promise<CommentAutomaticTagPolicies>;
    static getAutomaticTagAvailable(account: MAccountId): Promise<AutomaticTagAvailable>;
}
//# sourceMappingURL=automatic-tagger.d.ts.map