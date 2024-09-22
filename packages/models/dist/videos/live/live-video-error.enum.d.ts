export declare const LiveVideoError: {
    readonly BAD_SOCKET_HEALTH: 1;
    readonly DURATION_EXCEEDED: 2;
    readonly QUOTA_EXCEEDED: 3;
    readonly FFMPEG_ERROR: 4;
    readonly BLACKLISTED: 5;
    readonly RUNNER_JOB_ERROR: 6;
    readonly RUNNER_JOB_CANCEL: 7;
    readonly UNKNOWN_ERROR: 8;
    readonly INVALID_INPUT_VIDEO_STREAM: 9;
};
export type LiveVideoErrorType = typeof LiveVideoError[keyof typeof LiveVideoError];
//# sourceMappingURL=live-video-error.enum.d.ts.map