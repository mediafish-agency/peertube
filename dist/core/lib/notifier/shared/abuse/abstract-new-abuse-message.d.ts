import { MAbuseFull, MAbuseMessage, MAccountDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
type NewAbuseMessagePayload = {
    abuse: MAbuseFull;
    message: MAbuseMessage;
};
export declare abstract class AbstractNewAbuseMessage extends AbstractNotification<NewAbuseMessagePayload> {
    protected messageAccount: MAccountDefault;
    loadMessageAccount(): Promise<void>;
    getSetting(user: MUserWithNotificationSetting): number;
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    protected createEmailFor(to: string, target: 'moderator' | 'reporter'): {
        template: string;
        to: string;
        subject: string;
        locals: {
            abuseId: number;
            abuseUrl: string;
            messageAccountName: string;
            messageText: string;
            action: {
                text: string;
                url: string;
            };
        };
    };
    protected get abuse(): MAbuseFull;
    protected get message(): MAbuseMessage;
}
export {};
//# sourceMappingURL=abstract-new-abuse-message.d.ts.map