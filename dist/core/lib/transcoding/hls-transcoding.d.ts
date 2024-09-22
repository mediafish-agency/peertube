import { MVideo } from '../../types/models/index.js';
import { MutexInterface } from 'async-mutex';
import { Job } from 'bullmq';
import { VideoFileModel } from '../../models/video/video-file.js';
export declare function generateHlsPlaylistResolutionFromTS(options: {
    video: MVideo;
    concatenatedTsFilePath: string;
    resolution: number;
    fps: number;
    isAAC: boolean;
    inputFileMutexReleaser: MutexInterface.Releaser;
}): Promise<void>;
export declare function generateHlsPlaylistResolution(options: {
    video: MVideo;
    videoInputPath: string;
    separatedAudioInputPath: string;
    resolution: number;
    fps: number;
    copyCodecs: boolean;
    inputFileMutexReleaser: MutexInterface.Releaser;
    separatedAudio: boolean;
    job?: Job;
}): Promise<void>;
export declare function onHLSVideoFileTranscoding(options: {
    video: MVideo;
    videoOutputPath: string;
    m3u8OutputPath: string;
    filesLockedInParent?: boolean;
}): Promise<{
    resolutionPlaylistPath: string;
    videoFile: VideoFileModel;
}>;
//# sourceMappingURL=hls-transcoding.d.ts.map