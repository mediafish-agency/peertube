import { MVideoUUID } from '../../types/models/index.js';
import { BucketInfo } from './shared/index.js';
export declare function getInternalUrl(config: BucketInfo, keyWithoutPrefix: string): string;
export declare function getObjectStoragePublicFileUrl(fileUrl: string, objectStorageConfig: {
    BASE_URL: string;
}): string;
export declare function getHLSPrivateFileUrl(video: MVideoUUID, filename: string): string;
export declare function getWebVideoPrivateFileUrl(filename: string): string;
//# sourceMappingURL=urls.d.ts.map