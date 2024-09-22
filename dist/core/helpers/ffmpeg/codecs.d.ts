import { FfprobeData } from 'fluent-ffmpeg';
export declare function getVideoStreamCodec(path: string, existingProbe?: FfprobeData): Promise<string>;
export declare function getAudioStreamCodec(path: string, existingProbe?: FfprobeData): Promise<"" | "opus" | "vorbis" | "mp4a.40.2" | "mp4a.40.34">;
//# sourceMappingURL=codecs.d.ts.map