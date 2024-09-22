import { VideoFileMetadata } from '@peertube/peertube-models';
import { VideoSourceModel } from '../models/video/video-source.js';
import { MVideo, MVideoFile, MVideoId, MVideoThumbnail, MVideoWithAllFiles } from '../types/models/index.js';
import { FfprobeData } from 'fluent-ffmpeg';
import { Writable } from 'stream';
export declare function buildNewFile(options: {
    path: string;
    mode: 'web-video' | 'hls';
    ffprobe?: FfprobeData;
}): Promise<MVideoFile>;
export declare function removeHLSPlaylist(video: MVideoWithAllFiles): Promise<void>;
export declare function removeHLSFile(video: MVideoWithAllFiles, fileToDeleteId: number): Promise<import("../types/models/index.js").MStreamingPlaylistFilesVideo>;
export declare function removeAllWebVideoFiles(video: MVideoWithAllFiles): Promise<MVideoWithAllFiles>;
export declare function removeWebVideoFile(video: MVideoWithAllFiles, fileToDeleteId: number): Promise<MVideoWithAllFiles>;
export declare function buildFileMetadata(path: string, existingProbe?: FfprobeData): Promise<VideoFileMetadata>;
export declare function getVideoFileMimeType(extname: string, isAudio: boolean): string;
export declare function createVideoSource(options: {
    inputFilename: string;
    inputProbe: FfprobeData;
    inputPath: string;
    video: MVideoId;
    createdAt?: Date;
}): Promise<VideoSourceModel>;
export declare function saveNewOriginalFileIfNeeded(video: MVideo, videoFile: MVideoFile): Promise<void>;
export declare function muxToMergeVideoFiles(options: {
    video: MVideoThumbnail;
    videoFiles: MVideoFile[];
    output: Writable;
}): Promise<void>;
//# sourceMappingURL=video-file.d.ts.map