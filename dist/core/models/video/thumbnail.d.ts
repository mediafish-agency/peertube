import { ActivityIconObject, type ThumbnailType_Type } from '@peertube/peertube-models';
import { MThumbnail, MThumbnailVideo, MVideo, MVideoPlaylist } from '../../types/models/index.js';
import { VideoPlaylistModel } from './video-playlist.js';
import { VideoModel } from './video.js';
import { SequelizeModel } from '../shared/sequelize-type.js';
export declare class ThumbnailModel extends SequelizeModel<ThumbnailModel> {
    filename: string;
    height: number;
    width: number;
    type: ThumbnailType_Type;
    fileUrl: string;
    automaticallyGenerated: boolean;
    onDisk: boolean;
    videoId: number;
    Video: Awaited<VideoModel>;
    videoPlaylistId: number;
    VideoPlaylist: Awaited<VideoPlaylistModel>;
    createdAt: Date;
    updatedAt: Date;
    previousThumbnailFilename: string;
    private static readonly types;
    static removeOldFile(instance: ThumbnailModel, options: any): any;
    static removeFiles(instance: ThumbnailModel): void;
    static loadByFilename(filename: string, thumbnailType: ThumbnailType_Type): Promise<MThumbnail>;
    static loadWithVideoByFilename(filename: string, thumbnailType: ThumbnailType_Type): Promise<MThumbnailVideo>;
    static listRemoteOnDisk(): Promise<MThumbnail[]>;
    static buildPath(type: ThumbnailType_Type, filename: string): string;
    getOriginFileUrl(videoOrPlaylist: MVideo | MVideoPlaylist): string;
    getLocalStaticPath(): string;
    getPath(): string;
    getPreviousPath(): string;
    removeThumbnail(): Promise<void>;
    removePreviousFilenameIfNeeded(): void;
    isOwned(): boolean;
    toActivityPubObject(this: MThumbnail, video: MVideo): ActivityIconObject;
}
//# sourceMappingURL=thumbnail.d.ts.map