import { AbstractUserExporter } from './abstract-user-exporter.js';
import { FollowersExportJSON } from '@peertube/peertube-models';
export declare class FollowersExporter extends AbstractUserExporter<FollowersExportJSON> {
    export(): Promise<{
        json: FollowersExportJSON;
        staticFiles: any[];
    }>;
    private formatFollowersJSON;
}
//# sourceMappingURL=followers-exporter.d.ts.map