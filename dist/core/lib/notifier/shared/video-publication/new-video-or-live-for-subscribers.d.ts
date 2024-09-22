import { MUserWithNotificationSetting, MVideoAccountLight, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class NewVideoOrLiveForSubscribers extends AbstractNotification<MVideoAccountLight> {
    private users;
    prepare(): Promise<void>;
    log(): void;
    isDisabled(): boolean;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserWithNotificationSetting[];
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
    private createVideoEmail;
    private createLiveEmail;
}
//# sourceMappingURL=new-video-or-live-for-subscribers.d.ts.map