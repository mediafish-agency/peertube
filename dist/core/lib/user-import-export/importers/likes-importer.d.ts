import { LikesExportJSON } from '@peertube/peertube-models';
import { AbstractRatesImporter, SanitizedRateObject } from './abstract-rates-importer.js';
export declare class LikesImporter extends AbstractRatesImporter<LikesExportJSON, LikesExportJSON['likes'][0]> {
    protected getImportObjects(json: LikesExportJSON): {
        videoUrl: string;
        createdAt: string;
        archiveFiles?: never;
    }[];
    protected sanitize(o: LikesExportJSON['likes'][0]): Pick<{
        videoUrl: string;
        createdAt: string;
        archiveFiles?: never;
    }, "videoUrl">;
    protected importObject(likesImportData: SanitizedRateObject): Promise<{
        duplicate: boolean;
    }>;
}
//# sourceMappingURL=likes-importer.d.ts.map