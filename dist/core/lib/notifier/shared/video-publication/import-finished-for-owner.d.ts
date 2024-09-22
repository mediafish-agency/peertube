import { MUserDefault, MUserWithNotificationSetting, MVideoImportVideo, UserNotificationModelForApi } from '../../../../types/models/index.js';
import { AbstractNotification } from '../common/abstract-notification.js';
export type ImportFinishedForOwnerPayload = {
    videoImport: MVideoImportVideo;
    success: boolean;
};
export declare class ImportFinishedForOwner extends AbstractNotification<ImportFinishedForOwnerPayload> {
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
    private createSuccessEmail;
    private createFailEmail;
    private get videoImport();
}
//# sourceMappingURL=import-finished-for-owner.d.ts.map