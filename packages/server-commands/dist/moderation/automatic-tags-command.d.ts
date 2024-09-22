import { AutomaticTagAvailable, CommentAutomaticTagPolicies, CommentAutomaticTagPoliciesUpdate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class AutomaticTagsCommand extends AbstractCommand {
    getCommentPolicies(options: OverrideCommandOptions & {
        accountName: string;
    }): Promise<CommentAutomaticTagPolicies>;
    updateCommentPolicies(options: OverrideCommandOptions & CommentAutomaticTagPoliciesUpdate & {
        accountName: string;
    }): import("supertest").Test;
    getAccountAvailable(options: OverrideCommandOptions & {
        accountName: string;
    }): Promise<AutomaticTagAvailable>;
    getServerAvailable(options?: OverrideCommandOptions): Promise<AutomaticTagAvailable>;
}
//# sourceMappingURL=automatic-tags-command.d.ts.map