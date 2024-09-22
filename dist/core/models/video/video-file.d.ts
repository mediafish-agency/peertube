import { ActivityVideoUrlObject, type FileStorageType, type VideoFileFormatFlagType, type VideoFileStreamType } from '@peertube/peertube-models';
import { MStreamingPlaylistVideo, MVideo, MVideoWithHost } from '../../types/models/index.js';
import memoizee from 'memoizee';
import { Transaction } from 'sequelize';
import { MVideoFile, MVideoFileStreamingPlaylistVideo, MVideoFileVideo } from '../../types/models/video/video-file.js';
import { VideoRedundancyModel } from '../redundancy/video-redundancy.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoStreamingPlaylistModel } from './video-streaming-playlist.js';
import { VideoModel } from './video.js';
export declare enum ScopeNames {
    WITH_VIDEO = "WITH_VIDEO",
    WITH_METADATA = "WITH_METADATA",
    WITH_VIDEO_OR_PLAYLIST = "WITH_VIDEO_OR_PLAYLIST"
}
export declare class VideoFileModel extends SequelizeModel<VideoFileModel> {
    createdAt: Date;
    updatedAt: Date;
    resolution: number;
    width: number;
    height: number;
    size: number;
    extname: string;
    infoHash: string;
    fps: number;
    formatFlags: VideoFileFormatFlagType;
    streams: VideoFileStreamType;
    metadata: any;
    metadataUrl: string;
    fileUrl: string;
    filename: string;
    torrentUrl: string;
    torrentFilename: string;
    videoId: number;
    storage: FileStorageType;
    Video: Awaited<VideoModel>;
    videoStreamingPlaylistId: number;
    VideoStreamingPlaylist: Awaited<VideoStreamingPlaylistModel>;
    RedundancyVideos: Awaited<VideoRedundancyModel>[];
    static doesInfohashExistCached: typeof VideoFileModel.doesInfohashExist & memoizee.Memoized<typeof VideoFileModel.doesInfohashExist>;
    static doesInfohashExist(infoHash: string): Promise<boolean>;
    static doesVideoExistForVideoFile(id: number, videoIdOrUUID: number | string): Promise<boolean>;
    static doesOwnedTorrentFileExist(filename: string): Promise<boolean>;
    static doesOwnedFileExist(filename: string, storage: FileStorageType): Promise<boolean>;
    static loadByFilename(filename: string): Promise<VideoFileModel>;
    static loadWithVideoByFilename(filename: string): Promise<MVideoFileVideo | MVideoFileStreamingPlaylistVideo>;
    static loadWithVideoOrPlaylistByTorrentFilename(filename: string): Promise<VideoFileModel>;
    static load(id: number): Promise<MVideoFile>;
    static loadWithMetadata(id: number): Promise<VideoFileModel>;
    static loadWithVideo(id: number): Promise<VideoFileModel>;
    static loadWithVideoOrPlaylist(id: number, videoIdOrUUID: number | string): Promise<VideoFileModel>;
    static listByStreamingPlaylist(streamingPlaylistId: number, transaction: Transaction): Promise<VideoFileModel[]>;
    static getStats(): Promise<{
        totalLocalVideoFilesSize: number;
    }>;
    static customUpsert(videoFile: MVideoFile, mode: 'streaming-playlist' | 'video', transaction: Transaction): Promise<VideoFileModel>;
    static loadWebVideoFile(options: {
        videoId: number;
        fps: number;
        resolution: number;
        transaction?: Transaction;
    }): Promise<VideoFileModel>;
    static loadHLSFile(options: {
        playlistId: number;
        fps: number;
        resolution: number;
        transaction?: Transaction;
    }): Promise<VideoFileModel>;
    static removeHLSFilesOfStreamingPlaylistId(videoStreamingPlaylistId: number): Promise<number>;
    hasTorrent(): string;
    getVideoOrStreamingPlaylist(this: MVideoFileVideo | MVideoFileStreamingPlaylistVideo): MVideo | MStreamingPlaylistVideo;
    getVideo(this: MVideoFileVideo | MVideoFileStreamingPlaylistVideo): MVideo;
    isAudio(): boolean;
    isLive(): boolean;
    isHLS(): boolean;
    hasAudio(): boolean;
    hasVideo(): boolean;
    getObjectStorageUrl(video: MVideo): string;
    private getPrivateObjectStorageUrl;
    private getPublicObjectStorageUrl;
    getFileUrl(video: MVideo): string;
    getFileStaticPath(video: MVideo): string;
    private getWebVideoFileStaticPath;
    private getHLSFileStaticPath;
    getFileDownloadUrl(video: MVideoWithHost): string;
    getRemoteTorrentUrl(video: MVideo): string;
    getTorrentUrl(): string;
    getTorrentStaticPath(): string;
    getTorrentDownloadUrl(): string;
    removeTorrent(): Promise<void | import("winston").Logger>;
    hasSameUniqueKeysThan(other: MVideoFile): boolean;
    withVideoOrPlaylist(videoOrPlaylist: MVideo | MStreamingPlaylistVideo): this & {
        VideoStreamingPlaylist: MStreamingPlaylistVideo;
    };
    toActivityPubObject(this: MVideoFile, video: MVideo): ActivityVideoUrlObject;
}
//# sourceMappingURL=video-file.d.ts.map