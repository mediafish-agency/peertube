import { AbstractUserExporter } from './abstract-user-exporter.js';
import { ActivityPubOrderedCollection, DislikesExportJSON } from '@peertube/peertube-models';
export declare class DislikesExporter extends AbstractUserExporter<DislikesExportJSON> {
    export(): Promise<{
        json: DislikesExportJSON;
        activityPub: ActivityPubOrderedCollection<string>;
        staticFiles: any[];
    }>;
    getActivityPubFilename(): string;
    private formatDislikesJSON;
    private formatDislikesAP;
}
//# sourceMappingURL=dislikes-exporter.d.ts.map