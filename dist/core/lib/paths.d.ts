import { MStreamingPlaylistVideo, MUserExport, MUserImport, MVideo, MVideoFile, MVideoUUID } from '../types/models/index.js';
export declare function generateWebVideoFilename(resolution: number, extname: string): string;
export declare function generateHLSVideoFilename(resolution: number): string;
export declare function getLiveDirectory(video: MVideo): string;
export declare function getLiveReplayBaseDirectory(video: MVideo): string;
export declare function getHLSDirectory(video: MVideo): string;
export declare function getHLSRedundancyDirectory(video: MVideoUUID): string;
export declare function getHlsResolutionPlaylistFilename(videoFilename: string): string;
export declare function generateHLSMasterPlaylistFilename(isLive?: boolean): string;
export declare function generateHlsSha256SegmentsFilename(isLive?: boolean): string;
export declare function generateTorrentFileName(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, resolution: number): string;
export declare function getFSTorrentFilePath(videoFile: MVideoFile): string;
export declare function getFSUserExportFilePath(userExport: MUserExport): string;
export declare function getFSUserImportFilePath(userImport: MUserImport): string;
//# sourceMappingURL=paths.d.ts.map