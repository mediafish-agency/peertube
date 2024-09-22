import { MStreamingPlaylist, MStreamingPlaylistFilesVideo, MVideo } from '../types/models/index.js';
export declare function updateStreamingPlaylistsInfohashesIfNeeded(): Promise<void>;
export declare function updateM3U8AndShaPlaylist(video: MVideo, playlist: MStreamingPlaylist): Promise<void>;
export declare function updateMasterHLSPlaylist(video: MVideo, playlistArg: MStreamingPlaylist): Promise<MStreamingPlaylistFilesVideo>;
export declare function updateSha256VODSegments(video: MVideo, playlistArg: MStreamingPlaylist): Promise<MStreamingPlaylistFilesVideo>;
export declare function buildSha256Segment(segmentPath: string): Promise<string>;
export declare function downloadPlaylistSegments(playlistUrl: string, destinationDir: string, timeout: number, bodyKBLimit: number): Promise<void>;
export declare function renameVideoFileInPlaylist(playlistPath: string, newVideoFilename: string): Promise<void>;
export declare function injectQueryToPlaylistUrls(content: string, queryString: string): string;
//# sourceMappingURL=hls.d.ts.map