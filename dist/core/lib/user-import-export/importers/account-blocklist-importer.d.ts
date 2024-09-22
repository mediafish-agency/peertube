import { BlocklistExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type ImportObject = {
    handle: string | null;
    host: string | null;
    archiveFiles?: never;
};
export declare class BlocklistImporter extends AbstractUserImporter<BlocklistExportJSON, ImportObject, ImportObject> {
    protected getImportObjects(json: BlocklistExportJSON): ({
        handle: string;
        host: any;
    } | {
        handle: any;
        host: string;
    })[];
    protected sanitize(blocklistImportData: ImportObject): Pick<ImportObject, "host" | "handle">;
    protected importObject(blocklistImportData: ImportObject): Promise<{
        duplicate: boolean;
    }>;
    private importAccountBlock;
    private importServerBlock;
}
export {};
//# sourceMappingURL=account-blocklist-importer.d.ts.map