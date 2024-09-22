import { MUserDefault, MUserWithNotificationSetting, MVideoFullLight, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare abstract class AbstractOwnedVideoPublication extends AbstractNotification<MVideoFullLight> {
    protected user: MUserDefault;
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
            action: {
                text: string;
                url: string;
            };
        };
    };
}
//# sourceMappingURL=abstract-owned-video-publication.d.ts.map