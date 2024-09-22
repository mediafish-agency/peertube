import { UserVideoHistoryExportJSON } from '@peertube/peertube-models';
import { AbstractUserExporter } from './abstract-user-exporter.js';
export declare class UserVideoHistoryExporter extends AbstractUserExporter<UserVideoHistoryExportJSON> {
    export(): Promise<{
        json: UserVideoHistoryExportJSON;
        staticFiles: any[];
    }>;
}
//# sourceMappingURL=user-video-history-exporter.d.ts.map