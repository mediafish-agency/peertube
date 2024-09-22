import { AbstractUserExporter } from './abstract-user-exporter.js';
import { ActivityPubOrderedCollection, LikesExportJSON } from '@peertube/peertube-models';
export declare class LikesExporter extends AbstractUserExporter<LikesExportJSON> {
    export(): Promise<{
        json: LikesExportJSON;
        activityPub: ActivityPubOrderedCollection<string>;
        staticFiles: any[];
    }>;
    getActivityPubFilename(): string;
    private formatLikesJSON;
    private formatLikesAP;
}
//# sourceMappingURL=likes-exporter.d.ts.map