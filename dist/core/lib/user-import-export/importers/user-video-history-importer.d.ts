import { UserVideoHistoryExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<UserVideoHistoryExportJSON['watchedVideos'][0], 'videoUrl' | 'lastTimecode' | 'archiveFiles'>;
export declare class UserVideoHistoryImporter extends AbstractUserImporter<UserVideoHistoryExportJSON, UserVideoHistoryExportJSON['watchedVideos'][0], SanitizedObject> {
    protected getImportObjects(json: UserVideoHistoryExportJSON): {
        videoUrl: string;
        lastTimecode: number;
        createdAt: string;
        updatedAt: string;
        archiveFiles?: never;
    }[];
    protected sanitize(data: UserVideoHistoryExportJSON['watchedVideos'][0]): Pick<{
        videoUrl: string;
        lastTimecode: number;
        createdAt: string;
        updatedAt: string;
        archiveFiles?: never;
    }, "videoUrl" | "lastTimecode">;
    protected importObject(data: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
}
export {};
//# sourceMappingURL=user-video-history-importer.d.ts.map