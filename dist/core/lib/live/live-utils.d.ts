import { LiveVideoLatencyModeType } from '@peertube/peertube-models';
import { MStreamingPlaylist, MVideo } from '../../types/models/index.js';
export declare function buildConcatenatedName(segmentOrPlaylistPath: string): string;
export declare function cleanupAndDestroyPermanentLive(video: MVideo, streamingPlaylist: MStreamingPlaylist): Promise<void>;
export declare function cleanupUnsavedNormalLive(video: MVideo, streamingPlaylist: MStreamingPlaylist): Promise<void>;
export declare function cleanupTMPLiveFiles(video: MVideo, streamingPlaylist: MStreamingPlaylist): Promise<void>;
export declare function getLiveSegmentTime(latencyMode: LiveVideoLatencyModeType): number;
//# sourceMappingURL=live-utils.d.ts.map