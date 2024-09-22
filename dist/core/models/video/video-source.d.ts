import { ActivityVideoUrlObject, type FileStorageType, type VideoSource } from '@peertube/peertube-models';
import { MVideoSource } from '../../types/models/video/video-source.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class VideoSourceModel extends SequelizeModel<VideoSourceModel> {
    createdAt: Date;
    updatedAt: Date;
    inputFilename: string;
    keptOriginalFilename: string;
    resolution: number;
    width: number;
    height: number;
    fps: number;
    size: number;
    metadata: any;
    storage: FileStorageType;
    fileUrl: string;
    videoId: number;
    Video: Awaited<VideoModel>;
    static loadLatest(videoId: number, transaction?: Transaction): Promise<MVideoSource>;
    static loadByKeptOriginalFilename(keptOriginalFilename: string): Promise<MVideoSource>;
    static listAll(videoId: number, transaction?: Transaction): Promise<MVideoSource[]>;
    static doesOwnedFileExist(filename: string, storage: FileStorageType): Promise<boolean>;
    getFileDownloadUrl(): string;
    toActivityPubObject(this: MVideoSource): ActivityVideoUrlObject;
    toFormattedJSON(this: MVideoSource): VideoSource;
}
//# sourceMappingURL=video-source.d.ts.map