import { MUserDefault, MUserWithNotificationSetting, MVideoBlacklistLightVideo, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class NewAutoBlacklistForModerators extends AbstractNotification<MVideoBlacklistLightVideo> {
    private moderators;
    prepare(): Promise<void>;
    log(): void;
    getSetting(user: MUserWithNotificationSetting): number;
    getTargetUsers(): MUserDefault[];
    createNotification(user: MUserWithNotificationSetting): UserNotificationModelForApi;
    createEmail(to: string): Promise<{
        template: string;
        to: string;
        subject: string;
        locals: {
            channel: import("@peertube/peertube-models").VideoChannelSummary;
            videoUrl: string;
            videoName: string;
            action: {
                text: string;
                url: string;
            };
        };
    }>;
}
//# sourceMappingURL=new-auto-blacklist-for-moderators.d.ts.map