import { MApplication, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export type NewPeerTubeVersionForAdminsPayload = {
    application: MApplication;
    latestVersion: string;
};
export declare class NewPeerTubeVersionForAdmins extends AbstractNotification<NewPeerTubeVersionForAdminsPayload> {
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
            latestVersion: string;
        };
    };
}
//# sourceMappingURL=new-peertube-version-for-admins.d.ts.map