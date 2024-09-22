import { MAbuseFull, MUserDefault, MUserWithNotificationSetting, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { UserAbuse } from '@peertube/peertube-models';
import { AbstractNotification } from '../common/abstract-notification.js';
export type NewAbusePayload = {
    abuse: UserAbuse;
    abuseInstance: MAbuseFull;
    reporter: string;
};
export declare class NewAbuseForModerators extends AbstractNotification<NewAbusePayload> {
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
            videoUrl: string;
            isLocal: boolean;
            videoCreatedAt: string;
            videoPublishedAt: string;
            videoName: string;
            reason: string;
            videoChannel: import("@peertube/peertube-models").VideoChannel;
            reporter: string;
            action: {
                text: string;
                url: string;
            };
        };
    } | {
        template: string;
        to: string;
        subject: string;
        locals: {
            commentUrl: string;
            videoName: string;
            isLocal: boolean;
            commentCreatedAt: string;
            reason: string;
            flaggedAccount: string;
            reporter: string;
            action: {
                text: string;
                url: string;
            };
        };
    } | {
        template: string;
        to: string;
        subject: string;
        locals: {
            accountUrl: string;
            accountDisplayName: string;
            isLocal: boolean;
            reason: string;
            reporter: string;
            action: {
                text: string;
                url: string;
            };
        };
    };
    private createVideoAbuseEmail;
    private createCommentAbuseEmail;
    private createAccountAbuseEmail;
    private buildEmailAction;
}
//# sourceMappingURL=new-abuse-for-moderators.d.ts.map