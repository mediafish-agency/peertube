import { MAbuseFull, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class AbuseStateChangeForReporter extends AbstractNotification<MAbuseFull> {
    private user;
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
            action: {
                text: string;
                url: string;
            };
            abuseId: number;
            abuseUrl: string;
            isAccepted: boolean;
        };
    };
    private get abuse();
}
//# sourceMappingURL=abuse-state-change-for-reporter.d.ts.map