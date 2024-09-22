import { MutexInterface } from 'async-mutex';
import { FfprobeData } from 'fluent-ffmpeg';
import { FFmpegCommandWrapperOptions } from './ffmpeg-command-wrapper.js';
export declare class FFmpegImage {
    private readonly commandWrapper;
    constructor(options: FFmpegCommandWrapperOptions);
    convertWebPToJPG(options: {
        path: string;
        destination: string;
    }): Promise<void>;
    processGIF(options: {
        path: string;
        destination: string;
        newSize?: {
            width: number;
            height: number;
        };
    }): Promise<void>;
    generateThumbnailFromVideo(options: {
        fromPath: string;
        output: string;
        framesToAnalyze: number;
        scale?: {
            width: number;
            height: number;
        };
        ffprobe?: FfprobeData;
    }): Promise<void>;
    private buildGenerateThumbnailFromVideo;
    generateStoryboardFromVideo(options: {
        path: string;
        destination: string;
        inputFileMutexReleaser: MutexInterface.Releaser;
        sprites: {
            size: {
                width: number;
                height: number;
            };
            count: {
                width: number;
                height: number;
            };
            duration: number;
        };
    }): Promise<void>;
}
//# sourceMappingURL=ffmpeg-images.d.ts.map