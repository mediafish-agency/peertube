import { MVideoFile, MVideoFileRedundanciesOpt } from '../types/models/video/video-file.js';
import { MStreamingPlaylistVideo } from '../types/models/video/video-streaming-playlist.js';
import { MVideo } from '../types/models/video/video.js';
declare const createTorrentPromise: (arg1: string, arg2: any) => Promise<any>;
declare function downloadWebTorrentVideo(target: {
    uri: string;
    torrentName?: string;
}, timeout: number): Promise<string>;
declare function createTorrentAndSetInfoHash(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, videoFile: MVideoFile): Promise<void>;
declare function createTorrentAndSetInfoHashFromPath(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, videoFile: MVideoFile, filePath: string): Promise<void>;
declare function updateTorrentMetadata(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, videoFile: MVideoFile): Promise<void>;
declare function generateMagnetUri(video: MVideo, videoFile: MVideoFileRedundanciesOpt, trackerUrls: string[]): string;
export { createTorrentPromise, updateTorrentMetadata, createTorrentAndSetInfoHash, createTorrentAndSetInfoHashFromPath, generateMagnetUri, downloadWebTorrentVideo };
//# sourceMappingURL=webtorrent.d.ts.map