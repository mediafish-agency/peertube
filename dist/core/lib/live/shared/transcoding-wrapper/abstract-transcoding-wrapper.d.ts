import { LiveVideoErrorType } from '@peertube/peertube-models';
import { LoggerTagsFn } from '../../../../helpers/logger.js';
import { MStreamingPlaylistVideo, MVideoLiveVideo } from '../../../../types/models/index.js';
import EventEmitter from 'events';
import { FfprobeData } from 'fluent-ffmpeg';
interface TranscodingWrapperEvents {
    'end': () => void;
    'error': (options: {
        err: Error;
    }) => void;
}
declare interface AbstractTranscodingWrapper {
    on<U extends keyof TranscodingWrapperEvents>(event: U, listener: TranscodingWrapperEvents[U]): this;
    emit<U extends keyof TranscodingWrapperEvents>(event: U, ...args: Parameters<TranscodingWrapperEvents[U]>): boolean;
}
interface AbstractTranscodingWrapperOptions {
    streamingPlaylist: MStreamingPlaylistVideo;
    videoLive: MVideoLiveVideo;
    lTags: LoggerTagsFn;
    sessionId: string;
    inputLocalUrl: string;
    inputPublicUrl: string;
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
    outDirectory: string;
}
declare abstract class AbstractTranscodingWrapper extends EventEmitter {
    protected readonly videoLive: MVideoLiveVideo;
    protected readonly toTranscode: {
        resolution: number;
        fps: number;
    }[];
    protected readonly sessionId: string;
    protected readonly inputLocalUrl: string;
    protected readonly inputPublicUrl: string;
    protected readonly bitrate: number;
    protected readonly ratio: number;
    protected readonly hasAudio: boolean;
    protected readonly hasVideo: boolean;
    protected readonly probe: FfprobeData;
    protected readonly segmentListSize: number;
    protected readonly segmentDuration: number;
    protected readonly videoUUID: string;
    protected readonly outDirectory: string;
    protected readonly lTags: LoggerTagsFn;
    protected readonly streamingPlaylist: MStreamingPlaylistVideo;
    constructor(options: AbstractTranscodingWrapperOptions);
    abstract run(): Promise<void>;
    abstract abort(error?: LiveVideoErrorType): void;
}
export { type AbstractTranscodingWrapperOptions, AbstractTranscodingWrapper };
//# sourceMappingURL=abstract-transcoding-wrapper.d.ts.map