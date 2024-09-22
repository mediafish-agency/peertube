import { AccountExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<AccountExportJSON, 'description' | 'displayName' | 'archiveFiles'>;
export declare class AccountImporter extends AbstractUserImporter<AccountExportJSON, AccountExportJSON, SanitizedObject> {
    protected getImportObjects(json: AccountExportJSON): AccountExportJSON[];
    protected sanitize(blocklistImportData: AccountExportJSON): Pick<AccountExportJSON, "displayName" | "description" | "archiveFiles">;
    protected importObject(accountImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
    private importAvatar;
}
export {};
//# sourceMappingURL=account-importer.d.ts.map