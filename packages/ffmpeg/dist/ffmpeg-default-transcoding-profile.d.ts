import { EncoderOptionsBuilder } from '@peertube/peertube-models';
import { FfprobeData } from 'fluent-ffmpeg';
export declare function getDefaultAvailableEncoders(): {
    vod: {
        libx264: {
            default: EncoderOptionsBuilder;
        };
        aac: {
            default: EncoderOptionsBuilder;
        };
        libfdk_aac: {
            default: EncoderOptionsBuilder;
        };
    };
    live: {
        libx264: {
            default: EncoderOptionsBuilder;
        };
        aac: {
            default: EncoderOptionsBuilder;
        };
    };
};
export declare function getDefaultEncodersToTry(): {
    vod: {
        video: string[];
        audio: string[];
    };
    live: {
        video: string[];
        audio: string[];
    };
};
export declare function canDoQuickAudioTranscode(path: string, probe?: FfprobeData): Promise<boolean>;
export declare function canDoQuickVideoTranscode(path: string, maxFPS: number, probe?: FfprobeData): Promise<boolean>;
//# sourceMappingURL=ffmpeg-default-transcoding-profile.d.ts.map