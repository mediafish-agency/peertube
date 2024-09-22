import { MUserExport } from '../../types/models/index.js';
export declare class UserExporter {
    private archive;
    export(exportModel: MUserExport): Promise<void>;
    private createZip;
    private buildExporters;
    private addToArchiveAndWait;
    private appendJSON;
}
//# sourceMappingURL=user-exporter.d.ts.map