import { MutexInterface } from 'async-mutex';
import { FFmpegCommandWrapperOptions } from './ffmpeg-command-wrapper.js';
type BaseStudioOptions = {
    videoInputPath: string;
    separatedAudioInputPath?: string;
    outputPath: string;
    inputFileMutexReleaser?: MutexInterface.Releaser;
};
export declare class FFmpegEdition {
    private readonly commandWrapper;
    constructor(options: FFmpegCommandWrapperOptions);
    cutVideo(options: BaseStudioOptions & {
        start?: number;
        end?: number;
    }): Promise<void>;
    addWatermark(options: BaseStudioOptions & {
        watermarkPath: string;
        videoFilters: {
            watermarkSizeRatio: number;
            horitonzalMarginRatio: number;
            verticalMarginRatio: number;
        };
    }): Promise<void>;
    addIntroOutro(options: BaseStudioOptions & {
        introOutroPath: string;
        type: 'intro' | 'outro';
    }): Promise<void>;
    private buildInputs;
}
export {};
//# sourceMappingURL=ffmpeg-edition.d.ts.map