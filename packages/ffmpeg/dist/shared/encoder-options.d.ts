import { FfmpegCommand } from 'fluent-ffmpeg';
import { EncoderOptions } from '@peertube/peertube-models';
export declare function addDefaultEncoderGlobalParams(command: FfmpegCommand): void;
export declare function addDefaultEncoderParams(options: {
    command: FfmpegCommand;
    encoder: 'libx264' | string;
    fps: number;
    streamNum?: number;
}): void;
export declare function applyEncoderOptions(command: FfmpegCommand, options: EncoderOptions): void;
//# sourceMappingURL=encoder-options.d.ts.map