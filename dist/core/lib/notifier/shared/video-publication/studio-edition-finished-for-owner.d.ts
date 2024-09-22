import { MUserDefault, MUserWithNotificationSetting, MVideoFullLight, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class StudioEditionFinishedForOwner extends AbstractNotification<MVideoFullLight> {
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
            action: {
                text: string;
                url: string;
            };
        };
    };
}
//# sourceMappingURL=studio-edition-finished-for-owner.d.ts.map