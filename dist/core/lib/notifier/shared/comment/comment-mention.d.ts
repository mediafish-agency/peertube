import { MCommentOwnerVideo, MUserDefault, MUserNotifSettingAccount, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/index.js';
export declare class CommentMention extends AbstractNotification<MCommentOwnerVideo, MUserNotifSettingAccount> {
    private users;
    private serverAccountId;
    private accountMutedHash;
    private instanceMutedHash;
    isDisabled(): boolean;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserNotifSettingAccount): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        template: string;
        to: string;
        subject: string;
        locals: {
            comment: MCommentOwnerVideo;
            commentHtml: any;
            video: import("../../../../types/models/index.js").MVideoAccountIdUrl;
            videoUrl: string;
            accountName: string;
            action: {
                text: string;
                url: string;
            };
        };
    };
}
//# sourceMappingURL=comment-mention.d.ts.map