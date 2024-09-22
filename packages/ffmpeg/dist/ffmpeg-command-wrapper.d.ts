import { AvailableEncoders, EncoderOptionsBuilderParams, SimpleLogger } from '@peertube/peertube-models';
import { MutexInterface } from 'async-mutex';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'node:stream';
export interface FFmpegCommandWrapperOptions {
    availableEncoders?: AvailableEncoders;
    profile?: string;
    niceness: number;
    tmpDirectory: string;
    threads: number;
    logger: SimpleLogger;
    lTags?: {
        tags: string[];
    };
    updateJobProgress?: (progress?: number) => void;
    onEnd?: () => void;
    onError?: (err: Error) => void;
}
export declare class FFmpegCommandWrapper {
    private static supportedEncoders;
    private readonly availableEncoders;
    private readonly profile;
    private readonly niceness;
    private readonly tmpDirectory;
    private readonly threads;
    private readonly logger;
    private readonly lTags;
    private readonly updateJobProgress;
    private readonly onEnd?;
    private readonly onError?;
    private command;
    constructor(options: FFmpegCommandWrapperOptions);
    getAvailableEncoders(): AvailableEncoders;
    getProfile(): string;
    getCommand(): ffmpeg.FfmpegCommand;
    debugLog(msg: string, meta?: any): void;
    resetCommand(): void;
    buildCommand(inputs: (string | Readable)[] | string | Readable, inputFileMutexReleaser?: MutexInterface.Releaser): ffmpeg.FfmpegCommand;
    runCommand(options?: {
        silent?: boolean;
    }): Promise<void>;
    static resetSupportedEncoders(): void;
    getEncoderBuilderResult(options: EncoderOptionsBuilderParams & {
        streamType: 'video' | 'audio';
        input: string;
        videoType: 'vod' | 'live';
    }): Promise<{
        result: import("@peertube/peertube-models").EncoderOptions;
        encoder: string;
    }>;
    private checkFFmpegEncoders;
}
//# sourceMappingURL=ffmpeg-command-wrapper.d.ts.map