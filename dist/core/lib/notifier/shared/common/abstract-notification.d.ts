import { EmailPayload, UserNotificationSettingValueType } from '@peertube/peertube-models';
import { MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
export declare abstract class AbstractNotification<T, U = MUserWithNotificationSetting> {
    protected readonly payload: T;
    constructor(payload: T);
    abstract prepare(): Promise<void>;
    abstract log(): void;
    abstract getSetting(user: U): UserNotificationSettingValueType;
    abstract getTargetUsers(): U[];
    abstract createNotification(user: U): UserNotificationModelForApi;
    abstract createEmail(to: string): EmailPayload | Promise<EmailPayload>;
    isDisabled(): boolean | Promise<boolean>;
}
//# sourceMappingURL=abstract-notification.d.ts.map