export declare const VideoState: {
    readonly PUBLISHED: 1;
    readonly TO_TRANSCODE: 2;
    readonly TO_IMPORT: 3;
    readonly WAITING_FOR_LIVE: 4;
    readonly LIVE_ENDED: 5;
    readonly TO_MOVE_TO_EXTERNAL_STORAGE: 6;
    readonly TRANSCODING_FAILED: 7;
    readonly TO_MOVE_TO_EXTERNAL_STORAGE_FAILED: 8;
    readonly TO_EDIT: 9;
    readonly TO_MOVE_TO_FILE_SYSTEM: 10;
    readonly TO_MOVE_TO_FILE_SYSTEM_FAILED: 11;
};
export type VideoStateType = typeof VideoState[keyof typeof VideoState];
//# sourceMappingURL=video-state.enum.d.ts.map