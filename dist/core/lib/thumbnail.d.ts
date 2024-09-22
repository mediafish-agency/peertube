import { ThumbnailType_Type } from '@peertube/peertube-models';
import { FfprobeData } from 'fluent-ffmpeg';
import { MVideoFile, MVideoThumbnail, MVideoWithAllFiles } from '../types/models/index.js';
import { MThumbnail } from '../types/models/video/thumbnail.js';
import { MVideoPlaylistThumbnail } from '../types/models/video/video-playlist.js';
type ImageSize = {
    height?: number;
    width?: number;
};
export declare function updateLocalPlaylistMiniatureFromExisting(options: {
    inputPath: string;
    playlist: MVideoPlaylistThumbnail;
    automaticallyGenerated: boolean;
    keepOriginal?: boolean;
    size?: ImageSize;
}): Promise<MThumbnail>;
export declare function updateRemotePlaylistMiniatureFromUrl(options: {
    downloadUrl: string;
    playlist: MVideoPlaylistThumbnail;
    size?: ImageSize;
}): Promise<MThumbnail>;
export declare function updateLocalVideoMiniatureFromExisting(options: {
    inputPath: string;
    video: MVideoThumbnail;
    type: ThumbnailType_Type;
    automaticallyGenerated: boolean;
    size?: ImageSize;
    keepOriginal?: boolean;
}): Promise<MThumbnail>;
export declare function generateLocalVideoMiniature(options: {
    video: MVideoThumbnail;
    videoFile: MVideoFile;
    types: ThumbnailType_Type[];
    ffprobe: FfprobeData;
}): Promise<MThumbnail[]>;
export declare function updateLocalVideoMiniatureFromUrl(options: {
    downloadUrl: string;
    video: MVideoThumbnail;
    type: ThumbnailType_Type;
    size?: ImageSize;
}): Promise<MThumbnail>;
export declare function updateRemoteVideoThumbnail(options: {
    fileUrl: string;
    video: MVideoThumbnail;
    type: ThumbnailType_Type;
    size: ImageSize;
    onDisk: boolean;
}): MThumbnail;
export declare function regenerateMiniaturesIfNeeded(video: MVideoWithAllFiles, ffprobe: FfprobeData): Promise<void>;
export {};
//# sourceMappingURL=thumbnail.d.ts.map