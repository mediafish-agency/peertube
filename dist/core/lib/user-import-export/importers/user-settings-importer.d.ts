import { UserSettingsExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<UserSettingsExportJSON, 'nsfwPolicy' | 'autoPlayVideo' | 'autoPlayNextVideo' | 'autoPlayNextVideo' | 'autoPlayNextVideoPlaylist' | 'p2pEnabled' | 'videosHistoryEnabled' | 'videoLanguages' | 'theme' | 'notificationSettings'>;
export declare class UserSettingsImporter extends AbstractUserImporter<UserSettingsExportJSON, UserSettingsExportJSON, SanitizedObject> {
    protected getImportObjects(json: UserSettingsExportJSON): UserSettingsExportJSON[];
    protected sanitize(o: UserSettingsExportJSON): Pick<UserSettingsExportJSON, "nsfwPolicy" | "p2pEnabled" | "videosHistoryEnabled" | "autoPlayVideo" | "autoPlayNextVideo" | "autoPlayNextVideoPlaylist" | "videoLanguages" | "theme" | "notificationSettings">;
    protected importObject(userImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
    private updateSettings;
}
export {};
//# sourceMappingURL=user-settings-importer.d.ts.map