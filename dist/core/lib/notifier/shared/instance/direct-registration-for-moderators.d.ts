import { MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class DirectRegistrationForModerators extends AbstractNotification<MUserDefault> {
    private moderators;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        template: string;
        to: string;
        subject: string;
        locals: {
            user: MUserDefault;
        };
    };
}
//# sourceMappingURL=direct-registration-for-moderators.d.ts.map