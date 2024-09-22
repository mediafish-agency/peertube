import { MUserDefault, MUserWithNotificationSetting, MVideoBlacklistVideo, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class NewBlacklistForOwner extends AbstractNotification<MVideoBlacklistVideo> {
    private user;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        to: string;
        subject: string;
        text: string;
        locals: {
            title: string;
        };
    };
}
//# sourceMappingURL=new-blacklist-for-owner.d.ts.map