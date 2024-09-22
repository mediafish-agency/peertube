import { MUserId, MVideoLiveVideo } from '../../../types/models/index.js';
import { EventEmitter } from 'events';
import { FfprobeData } from 'fluent-ffmpeg';
interface MuxingSessionEvents {
    'live-ready': (options: {
        videoUUID: string;
    }) => void;
    'bad-socket-health': (options: {
        videoUUID: string;
    }) => void;
    'duration-exceeded': (options: {
        videoUUID: string;
    }) => void;
    'quota-exceeded': (options: {
        videoUUID: string;
    }) => void;
    'transcoding-end': (options: {
        videoUUID: string;
    }) => void;
    'transcoding-error': (options: {
        videoUUID: string;
    }) => void;
    'after-cleanup': (options: {
        videoUUID: string;
    }) => void;
}
declare interface MuxingSession {
    on<U extends keyof MuxingSessionEvents>(event: U, listener: MuxingSessionEvents[U]): this;
    emit<U extends keyof MuxingSessionEvents>(event: U, ...args: Parameters<MuxingSessionEvents[U]>): boolean;
}
declare class MuxingSession extends EventEmitter {
    private transcodingWrapper;
    private readonly context;
    private readonly user;
    private readonly sessionId;
    private readonly videoLive;
    private readonly inputLocalUrl;
    private readonly inputPublicUrl;
    private readonly fps;
    private readonly inputResolution;
    private readonly allResolutions;
    private readonly bitrate;
    private readonly ratio;
    private readonly hasAudio;
    private readonly hasVideo;
    private readonly probe;
    private readonly videoUUID;
    private readonly saveReplay;
    private readonly outDirectory;
    private readonly replayDirectory;
    private readonly lTags;
    private readonly objectStorageSendQueues;
    private segmentsToProcessPerPlaylist;
    private streamingPlaylist;
    private liveSegmentShaStore;
    private filesWatcher;
    private masterPlaylistCreated;
    private liveReady;
    private aborted;
    private readonly isAbleToUploadVideoWithCache;
    private readonly hasClientSocketInBadHealthWithCache;
    constructor(options: {
        context: any;
        user: MUserId;
        sessionId: string;
        videoLive: MVideoLiveVideo;
        inputLocalUrl: string;
        inputPublicUrl: string;
        fps: number;
        bitrate: number;
        ratio: number;
        inputResolution: number;
        allResolutions: number[];
        hasAudio: boolean;
        hasVideo: boolean;
        probe: FfprobeData;
    });
    runMuxing(): Promise<void>;
    abort(): void;
    destroy(): void;
    private watchMasterFile;
    private watchTSFiles;
    private isQuotaExceeded;
    private createFiles;
    private prepareDirectories;
    private isDurationConstraintValid;
    private processSegments;
    private processSegment;
    private processM3U8ToObjectStorage;
    private onTranscodingError;
    private onTranscodedEnded;
    private hasClientSocketInBadHealth;
    private addSegmentToReplay;
    private createLivePlaylist;
    private createLiveShaStore;
    private buildTranscodingWrapper;
    private getPlaylistIdFromTS;
    private getPlaylistNameFromTS;
    private buildToTranscode;
}
export { MuxingSession };
//# sourceMappingURL=muxing-session.d.ts.map