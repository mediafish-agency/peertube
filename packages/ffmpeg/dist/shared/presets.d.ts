import { FFmpegCommandWrapper } from '../ffmpeg-command-wrapper.js';
export declare function presetVOD(options: {
    commandWrapper: FFmpegCommandWrapper;
    videoInputPath: string;
    separatedAudioInputPath?: string;
    canCopyAudio: boolean;
    canCopyVideo: boolean;
    resolution: number;
    fps: number;
    videoStreamOnly: boolean;
    scaleFilterValue?: string;
}): Promise<void>;
export declare function presetCopy(commandWrapper: FFmpegCommandWrapper, options?: {
    withAudio?: boolean;
    withVideo?: boolean;
}): void;
//# sourceMappingURL=presets.d.ts.map