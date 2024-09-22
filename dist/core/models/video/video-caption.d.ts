import { VideoCaption, VideoCaptionObject } from '@peertube/peertube-models';
import { MVideo, MVideoCaption, MVideoCaptionFormattable, MVideoCaptionLanguageUrl, MVideoCaptionVideo } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare enum ScopeNames {
    WITH_VIDEO_UUID_AND_REMOTE = "WITH_VIDEO_UUID_AND_REMOTE"
}
export declare class VideoCaptionModel extends SequelizeModel<VideoCaptionModel> {
    createdAt: Date;
    updatedAt: Date;
    language: string;
    filename: string;
    fileUrl: string;
    automaticallyGenerated: boolean;
    videoId: number;
    Video: Awaited<VideoModel>;
    static removeFiles(instance: VideoCaptionModel, options: any): Promise<any>;
    static insertOrReplaceLanguage(caption: MVideoCaption, transaction: Transaction): Promise<VideoCaptionModel>;
    static loadByVideoIdAndLanguage(videoId: string | number, language: string, transaction?: Transaction): Promise<MVideoCaptionVideo>;
    static loadWithVideoByFilename(filename: string): Promise<MVideoCaptionVideo>;
    static hasVideoCaption(videoId: number): Promise<boolean>;
    static listVideoCaptions(videoId: number, transaction?: Transaction): Promise<MVideoCaptionVideo[]>;
    static listCaptionsOfMultipleVideos(videoIds: number[], transaction?: Transaction): Promise<{
        [id: number]: MVideoCaptionVideo[];
    }>;
    static getLanguageLabel(language: string): string;
    static generateCaptionName(language: string): string;
    toFormattedJSON(this: MVideoCaptionFormattable): VideoCaption;
    toActivityPubObject(this: MVideoCaptionLanguageUrl, video: MVideo): VideoCaptionObject;
    isOwned(): boolean;
    getCaptionStaticPath(this: MVideoCaptionLanguageUrl): string;
    getFSPath(): string;
    removeCaptionFile(this: MVideoCaption): Promise<void>;
    getFileUrl(this: MVideoCaptionLanguageUrl, video: MVideo): string;
    isEqual(this: MVideoCaption, other: MVideoCaption): boolean;
}
//# sourceMappingURL=video-caption.d.ts.map