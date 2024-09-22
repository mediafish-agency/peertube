import { FfmpegCommand, FfprobeData } from 'fluent-ffmpeg';
import { FFmpegCommandWrapperOptions } from './ffmpeg-command-wrapper.js';
type LiveTranscodingOptions = {
    inputUrl: string;
    outPath: string;
    masterPlaylistName: string;
    toTranscode: {
        resolution: number;
        fps: number;
    }[];
    bitrate: number;
    ratio: number;
    hasAudio: boolean;
    hasVideo: boolean;
    probe: FfprobeData;
    segmentListSize: number;
    segmentDuration: number;
    splitAudioAndVideo: boolean;
};
export declare class FFmpegLive {
    private readonly commandWrapper;
    constructor(options: FFmpegCommandWrapperOptions);
    getLiveTranscodingCommand(options: LiveTranscodingOptions): Promise<FfmpegCommand>;
    private isAudioInputOrOutputOnly;
    private buildTranscodingStream;
    getLiveMuxingCommand(options: {
        inputUrl: string;
        outPath: string;
        masterPlaylistName: string;
        segmentListSize: number;
        segmentDuration: number;
    }): FfmpegCommand;
    private addDefaultLiveHLSParams;
}
export {};
//# sourceMappingURL=ffmpeg-live.d.ts.map