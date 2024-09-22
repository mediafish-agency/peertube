import { Readable, Writable } from 'stream';
import { FFmpegCommandWrapperOptions } from './ffmpeg-command-wrapper.js';
export declare class FFmpegContainer {
    private readonly commandWrapper;
    constructor(options: FFmpegCommandWrapperOptions);
    mergeInputs(options: {
        inputs: (Readable | string)[];
        output: Writable;
        logError: boolean;
        coverPath?: string;
    }): Promise<void>;
}
//# sourceMappingURL=ffmpeg-container.d.ts.map