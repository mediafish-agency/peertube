import { MPlugin, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class NewPluginVersionForAdmins extends AbstractNotification<MPlugin> {
    private admins;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): {
        to: string;
        template: string;
        subject: string;
        locals: {
            pluginName: string;
            latestVersion: string;
            pluginUrl: string;
        };
    };
    private get plugin();
}
//# sourceMappingURL=new-plugin-version-for-admins.d.ts.map