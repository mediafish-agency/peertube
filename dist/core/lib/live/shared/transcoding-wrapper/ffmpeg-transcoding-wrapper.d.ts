import { AbstractTranscodingWrapper } from './abstract-transcoding-wrapper.js';
export declare class FFmpegTranscodingWrapper extends AbstractTranscodingWrapper {
    private ffmpegCommand;
    private aborted;
    private errored;
    private ended;
    run(): Promise<void>;
    abort(): void;
    private onFFmpegError;
    private onFFmpegEnded;
    private buildFFmpegLive;
}
//# sourceMappingURL=ffmpeg-transcoding-wrapper.d.ts.map