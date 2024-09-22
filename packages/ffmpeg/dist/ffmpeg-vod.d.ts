import { MutexInterface } from 'async-mutex';
import { FFmpegCommandWrapperOptions } from './ffmpeg-command-wrapper.js';
export type TranscodeVODOptionsType = 'hls' | 'hls-from-ts' | 'quick-transcode' | 'video' | 'merge-audio';
export interface BaseTranscodeVODOptions {
    type: TranscodeVODOptionsType;
    videoInputPath: string;
    separatedAudioInputPath?: string;
    outputPath: string;
    inputFileMutexReleaser: MutexInterface.Releaser;
    resolution: number;
    fps: number;
}
export interface HLSTranscodeOptions extends BaseTranscodeVODOptions {
    type: 'hls';
    copyCodecs: boolean;
    separatedAudio: boolean;
    hlsPlaylist: {
        videoFilename: string;
    };
}
export interface HLSFromTSTranscodeOptions extends BaseTranscodeVODOptions {
    type: 'hls-from-ts';
    isAAC: boolean;
    hlsPlaylist: {
        videoFilename: string;
    };
}
export interface QuickTranscodeOptions extends BaseTranscodeVODOptions {
    type: 'quick-transcode';
}
export interface VideoTranscodeOptions extends BaseTranscodeVODOptions {
    type: 'video';
}
export interface MergeAudioTranscodeOptions extends BaseTranscodeVODOptions {
    type: 'merge-audio';
    audioPath: string;
}
export type TranscodeVODOptions = HLSTranscodeOptions | HLSFromTSTranscodeOptions | VideoTranscodeOptions | MergeAudioTranscodeOptions | QuickTranscodeOptions;
export declare class FFmpegVOD {
    private readonly commandWrapper;
    private ended;
    constructor(options: FFmpegCommandWrapperOptions);
    transcode(options: TranscodeVODOptions): Promise<void>;
    isEnded(): boolean;
    private buildVODCommand;
    private buildQuickTranscodeCommand;
    private buildAudioMergeCommand;
    private getMergeAudioScaleFilterValue;
    private buildHLSVODCommand;
    private buildHLSVODFromTSCommand;
    private addCommonHLSVODCommandOptions;
    private fixHLSPlaylistIfNeeded;
    private getHLSVideoPath;
}
//# sourceMappingURL=ffmpeg-vod.d.ts.map