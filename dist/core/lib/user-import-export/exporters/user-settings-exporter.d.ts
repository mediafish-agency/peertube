import { AbstractUserExporter } from './abstract-user-exporter.js';
import { UserSettingsExportJSON } from '@peertube/peertube-models';
export declare class UserSettingsExporter extends AbstractUserExporter<UserSettingsExportJSON> {
    export(): {
        json: {
            email: string;
            emailPublic: boolean;
            nsfwPolicy: import("@peertube/peertube-models").NSFWPolicyType;
            autoPlayVideo: boolean;
            autoPlayNextVideo: boolean;
            autoPlayNextVideoPlaylist: boolean;
            p2pEnabled: boolean;
            videosHistoryEnabled: boolean;
            videoLanguages: string[];
            theme: string;
            createdAt: Date;
            notificationSettings: import("@peertube/peertube-models").UserNotificationSetting;
        };
        staticFiles: any[];
    };
}
//# sourceMappingURL=user-settings-exporter.d.ts.map