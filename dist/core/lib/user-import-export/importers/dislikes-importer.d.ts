import { DislikesExportJSON } from '@peertube/peertube-models';
import { AbstractRatesImporter, SanitizedRateObject } from './abstract-rates-importer.js';
export declare class DislikesImporter extends AbstractRatesImporter<DislikesExportJSON, DislikesExportJSON['dislikes'][0]> {
    protected getImportObjects(json: DislikesExportJSON): {
        videoUrl: string;
        createdAt: string;
        archiveFiles?: never;
    }[];
    protected sanitize(o: DislikesExportJSON['dislikes'][0]): Pick<{
        videoUrl: string;
        createdAt: string;
        archiveFiles?: never;
    }, "videoUrl">;
    protected importObject(dislikesImportData: SanitizedRateObject): Promise<{
        duplicate: boolean;
    }>;
}
//# sourceMappingURL=dislikes-importer.d.ts.map