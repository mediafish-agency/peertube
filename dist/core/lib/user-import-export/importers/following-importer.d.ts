import { FollowingExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<FollowingExportJSON['following'][0], 'targetHandle'>;
export declare class FollowingImporter extends AbstractUserImporter<FollowingExportJSON, FollowingExportJSON['following'][0], SanitizedObject> {
    protected getImportObjects(json: FollowingExportJSON): {
        handle: string;
        targetHandle: string;
        createdAt: string;
        archiveFiles?: never;
    }[];
    protected sanitize(followingImportData: FollowingExportJSON['following'][0]): Pick<{
        handle: string;
        targetHandle: string;
        createdAt: string;
        archiveFiles?: never;
    }, "targetHandle">;
    protected importObject(followingImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
}
export {};
//# sourceMappingURL=following-importer.d.ts.map