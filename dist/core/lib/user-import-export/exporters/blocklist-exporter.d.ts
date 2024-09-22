import { AbstractUserExporter } from './abstract-user-exporter.js';
import { BlocklistExportJSON } from '@peertube/peertube-models';
export declare class BlocklistExporter extends AbstractUserExporter<BlocklistExportJSON> {
    export(): Promise<{
        json: BlocklistExportJSON;
        staticFiles: any[];
    }>;
}
//# sourceMappingURL=blocklist-exporter.d.ts.map