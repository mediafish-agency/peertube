import { MCommentOwnerVideo, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class NewCommentForVideoOwner extends AbstractNotification<MCommentOwnerVideo> {
    private user;
    prepare(): Promise<void>;
    log(): void;
    isDisabled(): true | Promise<boolean>;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        template: string;
        to: string;
        subject: string;
        locals: {
            accountName: string;
            accountUrl: string;
            comment: MCommentOwnerVideo;
            commentHtml: any;
            video: import("../../../../types/models/index.js").MVideoAccountIdUrl;
            videoUrl: string;
            requiresApproval: boolean;
            action: {
                text: string;
                url: string;
            };
        };
    };
}
//# sourceMappingURL=new-comment-for-video-owner.d.ts.map