import { MUserDefault, MUserWithNotificationSetting, MVideoCaptionVideo, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export declare class VideoTranscriptionGeneratedForOwner extends AbstractNotification<MVideoCaptionVideo> {
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
//# sourceMappingURL=video-transcription-generated-for-owner.d.ts.map