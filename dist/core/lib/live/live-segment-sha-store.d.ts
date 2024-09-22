import { MStreamingPlaylistVideo } from '../../types/models/index.js';
declare class LiveSegmentShaStore {
    private readonly segmentsSha256;
    private readonly videoUUID;
    private readonly sha256Path;
    private readonly sha256PathTMP;
    private readonly streamingPlaylist;
    private readonly sendToObjectStorage;
    private readonly writeQueue;
    constructor(options: {
        videoUUID: string;
        sha256Path: string;
        streamingPlaylist: MStreamingPlaylistVideo;
        sendToObjectStorage: boolean;
    });
    addSegmentSha(segmentPath: string): Promise<void>;
    removeSegmentSha(segmentPath: string): Promise<void>;
    private writeToDisk;
}
export { LiveSegmentShaStore };
//# sourceMappingURL=live-segment-sha-store.d.ts.map