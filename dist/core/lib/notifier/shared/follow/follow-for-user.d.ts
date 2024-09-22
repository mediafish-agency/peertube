import { MActorFollowFull, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class FollowForUser extends AbstractNotification<MActorFollowFull> {
    private followType;
    private user;
    prepare(): Promise<void>;
    isDisabled(): Promise<boolean>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        template: string;
        to: string;
        subject: string;
        locals: {
            followerName: string;
            followerUrl: string;
            followingName: string;
            followingUrl: string;
            followType: "account" | "channel";
        };
    };
    private get actorFollow();
}
//# sourceMappingURL=follow-for-user.d.ts.map