import { EncoderOptions } from '@peertube/peertube-models';
export type StreamType = 'audio' | 'video';
export declare function buildStreamSuffix(base: string, streamNum?: number): string;
export declare function getScaleFilter(options: EncoderOptions): string;
//# sourceMappingURL=ffmpeg-utils.d.ts.map