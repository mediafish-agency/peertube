import { MStreamingPlaylistVideo, MVideo, MVideoFile } from '../../types/models/index.js';
import { MVideoSource } from '../../types/models/video/video-source.js';
export declare function listHLSFileKeysOf(playlist: MStreamingPlaylistVideo): Promise<string[]>;
export declare function storeHLSFileFromFilename(playlist: MStreamingPlaylistVideo, filename: string): Promise<string>;
export declare function storeHLSFileFromPath(playlist: MStreamingPlaylistVideo, path: string): Promise<string>;
export declare function storeHLSFileFromContent(playlist: MStreamingPlaylistVideo, pathOrFilename: string, content: string): Promise<string>;
export declare function storeWebVideoFile(video: MVideo, file: MVideoFile): Promise<string>;
export declare function storeOriginalVideoFile(inputPath: string, filename: string): Promise<string>;
export declare function updateWebVideoFileACL(video: MVideo, file: MVideoFile): Promise<void>;
export declare function updateHLSFilesACL(playlist: MStreamingPlaylistVideo): Promise<void>;
export declare function removeHLSObjectStorage(playlist: MStreamingPlaylistVideo): Promise<void>;
export declare function removeHLSFileObjectStorageByFilename(playlist: MStreamingPlaylistVideo, filename: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function removeHLSFileObjectStorageByPath(playlist: MStreamingPlaylistVideo, path: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function removeHLSFileObjectStorageByFullKey(key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function removeWebVideoObjectStorage(videoFile: MVideoFile): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function removeOriginalFileObjectStorage(videoSource: MVideoSource): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
export declare function makeHLSFileAvailable(playlist: MStreamingPlaylistVideo, filename: string, destination: string): Promise<string>;
export declare function makeWebVideoFileAvailable(filename: string, destination: string): Promise<string>;
export declare function makeOriginalFileAvailable(keptOriginalFilename: string, destination: string): Promise<string>;
export declare function getWebVideoFileReadStream(options: {
    filename: string;
    rangeHeader: string;
}): Promise<{
    response: import("@aws-sdk/client-s3").GetObjectCommandOutput;
    stream: import("stream").Readable;
}>;
export declare function getHLSFileReadStream(options: {
    playlist: MStreamingPlaylistVideo;
    filename: string;
    rangeHeader: string;
}): Promise<{
    response: import("@aws-sdk/client-s3").GetObjectCommandOutput;
    stream: import("stream").Readable;
}>;
export declare function getOriginalFileReadStream(options: {
    keptOriginalFilename: string;
    rangeHeader: string;
}): Promise<{
    response: import("@aws-sdk/client-s3").GetObjectCommandOutput;
    stream: import("stream").Readable;
}>;
//# sourceMappingURL=videos.d.ts.map