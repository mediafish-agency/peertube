import { MUserExport } from '../../types/models/index.js';
import { Readable } from 'stream';
export declare function storeUserExportFile(stream: Readable, userExport: MUserExport): Promise<string>;
export declare function removeUserExportObjectStorage(userExport: MUserExport): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function getUserExportFileObjectStorageSize(userExport: MUserExport): Promise<number>;
//# sourceMappingURL=user-export.d.ts.map