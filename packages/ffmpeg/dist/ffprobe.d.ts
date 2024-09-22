import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';
declare function ffprobePromise(path: string): Promise<ffmpeg.FfprobeData>;
declare function isAudioFile(path: string, existingProbe?: FfprobeData): Promise<boolean>;
declare function hasAudioStream(path: string, existingProbe?: FfprobeData): Promise<boolean>;
declare function getAudioStream(videoPath: string, existingProbe?: FfprobeData): Promise<{
    absolutePath: string;
    audioStream: ffmpeg.FfprobeStream;
    bitrate: number;
} | {
    absolutePath: string;
    audioStream?: undefined;
    bitrate?: undefined;
}>;
declare function getMaxAudioBitrate(type: 'aac' | 'mp3' | string, bitrate: number): 384 | 256 | -1 | 128;
declare function getVideoStreamDimensionsInfo(path: string, existingProbe?: FfprobeData): Promise<{
    width: number;
    height: number;
    ratio: number;
    resolution: number;
    isPortraitMode: boolean;
}>;
declare function getVideoStreamFPS(path: string, existingProbe?: FfprobeData): Promise<number>;
declare function getVideoStreamBitrate(path: string, existingProbe?: FfprobeData): Promise<number>;
declare function getVideoStreamDuration(path: string, existingProbe?: FfprobeData): Promise<number>;
declare function getVideoStream(path: string, existingProbe?: FfprobeData): Promise<ffmpeg.FfprobeStream>;
declare function hasVideoStream(path: string, existingProbe?: FfprobeData): Promise<boolean>;
declare function getChaptersFromContainer(options: {
    path: string;
    maxTitleLength: number;
    ffprobe?: FfprobeData;
}): Promise<{
    timecode: number;
    title: any;
}[]>;
export { getVideoStreamDimensionsInfo, getChaptersFromContainer, getMaxAudioBitrate, getVideoStream, getVideoStreamDuration, getAudioStream, getVideoStreamFPS, isAudioFile, ffprobePromise, getVideoStreamBitrate, hasAudioStream, hasVideoStream };
//# sourceMappingURL=ffprobe.d.ts.map