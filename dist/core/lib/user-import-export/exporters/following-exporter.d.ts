import { AbstractUserExporter } from './abstract-user-exporter.js';
import { ActivityPubOrderedCollection, FollowingExportJSON } from '@peertube/peertube-models';
export declare class FollowingExporter extends AbstractUserExporter<FollowingExportJSON> {
    export(): Promise<{
        json: FollowingExportJSON;
        staticFiles: any[];
        activityPub: ActivityPubOrderedCollection<string>;
    }>;
    getActivityPubFilename(): string;
    private formatFollowingJSON;
    private formatFollowingAP;
}
//# sourceMappingURL=following-exporter.d.ts.map