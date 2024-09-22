import { Readable } from 'stream';
type BucketInfo = {
    BUCKET_NAME: string;
    PREFIX?: string;
};
declare function listKeysOfPrefix(prefix: string, bucketInfo: BucketInfo, continuationToken?: string): Promise<string[]>;
declare function storeObject(options: {
    inputPath: string;
    objectStorageKey: string;
    bucketInfo: BucketInfo;
    isPrivate: boolean;
}): Promise<string>;
declare function storeContent(options: {
    content: string;
    objectStorageKey: string;
    bucketInfo: BucketInfo;
    isPrivate: boolean;
}): Promise<string>;
declare function storeStream(options: {
    stream: Readable;
    objectStorageKey: string;
    bucketInfo: BucketInfo;
    isPrivate: boolean;
}): Promise<string>;
declare function updateObjectACL(options: {
    objectStorageKey: string;
    bucketInfo: BucketInfo;
    isPrivate: boolean;
}): Promise<void>;
declare function updatePrefixACL(options: {
    prefix: string;
    bucketInfo: BucketInfo;
    isPrivate: boolean;
}): Promise<void>;
declare function removeObject(objectStorageKey: string, bucketInfo: BucketInfo): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
declare function removeObjectByFullKey(fullKey: string, bucketInfo: Pick<BucketInfo, 'BUCKET_NAME'>): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
declare function removePrefix(prefix: string, bucketInfo: BucketInfo): Promise<void>;
declare function makeAvailable(options: {
    key: string;
    destination: string;
    bucketInfo: BucketInfo;
}): Promise<void>;
declare function buildKey(key: string, bucketInfo: BucketInfo): string;
declare function createObjectReadStream(options: {
    key: string;
    bucketInfo: BucketInfo;
    rangeHeader: string;
}): Promise<{
    response: import("@aws-sdk/client-s3").GetObjectCommandOutput;
    stream: Readable;
}>;
declare function getObjectStorageFileSize(options: {
    key: string;
    bucketInfo: BucketInfo;
}): Promise<number>;
export { type BucketInfo, buildKey, storeObject, storeContent, storeStream, removeObject, removeObjectByFullKey, removePrefix, makeAvailable, updateObjectACL, updatePrefixACL, listKeysOfPrefix, createObjectReadStream, getObjectStorageFileSize };
//# sourceMappingURL=object-storage-helpers.d.ts.map