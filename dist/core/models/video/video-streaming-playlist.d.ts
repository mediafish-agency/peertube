import { type FileStorageType, type VideoStreamingPlaylistType_Type } from '@peertube/peertube-models';
import { VideoFileModel } from './video-file.js';
import { MStreamingPlaylist, MStreamingPlaylistFiles, MStreamingPlaylistFilesVideo, MVideo } from '../../types/models/index.js';
import memoizee from 'memoizee';
import { Transaction } from 'sequelize';
import { VideoRedundancyModel } from '../redundancy/video-redundancy.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class VideoStreamingPlaylistModel extends SequelizeModel<VideoStreamingPlaylistModel> {
    createdAt: Date;
    updatedAt: Date;
    type: VideoStreamingPlaylistType_Type;
    playlistFilename: string;
    playlistUrl: string;
    p2pMediaLoaderInfohashes: string[];
    p2pMediaLoaderPeerVersion: number;
    segmentsSha256Filename: string;
    segmentsSha256Url: string;
    videoId: number;
    storage: FileStorageType;
    Video: Awaited<VideoModel>;
    VideoFiles: Awaited<VideoFileModel>[];
    RedundancyVideos: Awaited<VideoRedundancyModel>[];
    static doesInfohashExistCached: typeof VideoStreamingPlaylistModel.doesInfohashExist & memoizee.Memoized<typeof VideoStreamingPlaylistModel.doesInfohashExist>;
    static doesInfohashExist(infoHash: string): Promise<boolean>;
    static buildP2PMediaLoaderInfoHashes(playlistUrl: string, files: unknown[]): string[];
    static listByIncorrectPeerVersion(): Promise<VideoStreamingPlaylistModel[]>;
    static loadWithVideoAndFiles(id: number): Promise<MStreamingPlaylistFilesVideo>;
    static loadWithVideo(id: number): Promise<VideoStreamingPlaylistModel>;
    static loadHLSPlaylistByVideo(videoId: number, transaction?: Transaction): Promise<MStreamingPlaylist>;
    static loadOrGenerate(video: MVideo, transaction?: Transaction): Promise<MStreamingPlaylist & {
        Video: MVideo;
    }>;
    static doesOwnedVideoUUIDExist(videoUUID: string, storage: FileStorageType): Promise<boolean>;
    assignP2PMediaLoaderInfoHashes(video: MVideo, files: unknown[]): void;
    getMasterPlaylistUrl(video: MVideo): string;
    private getMasterPlaylistObjectStorageUrl;
    getSha256SegmentsUrl(video: MVideo): string;
    private getSha256SegmentsObjectStorageUrl;
    hasAudioAndVideoSplitted(this: MStreamingPlaylistFiles): boolean;
    getStringType(): "hls" | "unknown";
    getTrackerUrls(baseUrlHttp: string, baseUrlWs: string): string[];
    hasSameUniqueKeysThan(other: MStreamingPlaylist): boolean;
    withVideo(video: MVideo): this & {
        Video: MVideo;
    };
    private getMasterPlaylistStaticPath;
    private getSha256SegmentsStaticPath;
}
//# sourceMappingURL=video-streaming-playlist.d.ts.map