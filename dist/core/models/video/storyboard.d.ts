import { MStoryboard, MStoryboardVideo, MVideo } from '../../types/models/index.js';
import { Storyboard } from '@peertube/peertube-models';
import { VideoModel } from './video.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
export declare class StoryboardModel extends SequelizeModel<StoryboardModel> {
    filename: string;
    totalHeight: number;
    totalWidth: number;
    spriteHeight: number;
    spriteWidth: number;
    spriteDuration: number;
    fileUrl: string;
    videoId: number;
    Video: Awaited<VideoModel>;
    createdAt: Date;
    updatedAt: Date;
    static removeInstanceFile(instance: StoryboardModel): void;
    static loadByVideo(videoId: number, transaction?: Transaction): Promise<MStoryboard>;
    static loadByFilename(filename: string): Promise<MStoryboard>;
    static loadWithVideoByFilename(filename: string): Promise<MStoryboardVideo>;
    static listStoryboardsOf(video: MVideo): Promise<MStoryboardVideo[]>;
    getOriginFileUrl(video: MVideo): string;
    getLocalStaticPath(): string;
    getPath(): string;
    removeFile(): Promise<void>;
    toFormattedJSON(this: MStoryboardVideo): Storyboard;
}
//# sourceMappingURL=storyboard.d.ts.map