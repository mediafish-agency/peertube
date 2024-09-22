import { AccountExportJSON, ActivityPubActor } from '@peertube/peertube-models';
import { ActorExporter } from './actor-exporter.js';
export declare class AccountExporter extends ActorExporter<AccountExportJSON> {
    export(): Promise<{
        json: AccountExportJSON;
        staticFiles: {
            archivePath: string;
            readStreamFactory: () => Promise<import("stream").Readable>;
        }[];
        activityPub: ActivityPubActor;
    }>;
    getActivityPubFilename(): string;
    private exportAccountJSON;
    private exportAccountAP;
}
//# sourceMappingURL=account-exporter.d.ts.map