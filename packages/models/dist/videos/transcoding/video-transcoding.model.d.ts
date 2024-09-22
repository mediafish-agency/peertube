import { FfprobeData } from 'fluent-ffmpeg';
export type EncoderOptionsBuilderParams = {
    input: string;
    resolution: number;
    canCopyAudio: boolean;
    canCopyVideo: boolean;
    fps: number;
    inputBitrate: number;
    inputRatio: number;
    inputProbe: FfprobeData;
    streamNum?: number;
};
export type EncoderOptionsBuilder = (params: EncoderOptionsBuilderParams) => Promise<EncoderOptions> | EncoderOptions;
export interface EncoderOptions {
    copy?: boolean;
    scaleFilter?: {
        name: string;
    };
    inputOptions?: string[];
    outputOptions?: string[];
}
export interface EncoderProfile<T> {
    [profile: string]: T;
    default: T;
}
export type AvailableEncoders = {
    available: {
        live: {
            [encoder: string]: EncoderProfile<EncoderOptionsBuilder>;
        };
        vod: {
            [encoder: string]: EncoderProfile<EncoderOptionsBuilder>;
        };
    };
    encodersToTry: {
        vod: {
            video: string[];
            audio: string[];
        };
        live: {
            video: string[];
            audio: string[];
        };
    };
};
//# sourceMappingURL=video-transcoding.model.d.ts.map