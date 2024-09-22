import { MActorFollowFull, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class AutoFollowForInstance extends AbstractNotification<MActorFollowFull> {
    private admins;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        to: string;
        subject: string;
        text: string;
    };
    private get actorFollow();
}
//# sourceMappingURL=auto-follow-for-instance.d.ts.map