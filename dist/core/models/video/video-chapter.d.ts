import { MVideo, MVideoChapter } from '../../types/models/index.js';
import { VideoChapter, VideoChapterObject } from '@peertube/peertube-models';
import { VideoModel } from './video.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/sequelize-type.js';
export declare class VideoChapterModel extends SequelizeModel<VideoChapterModel> {
    timecode: number;
    title: string;
    videoId: number;
    Video: Awaited<VideoModel>;
    createdAt: Date;
    updatedAt: Date;
    static deleteChapters(videoId: number, transaction: Transaction): Promise<number>;
    static listChaptersOfVideo(videoId: number, transaction?: Transaction): Promise<MVideoChapter[]>;
    static hasVideoChapters(videoId: number, transaction: Transaction): Promise<boolean>;
    toActivityPubJSON(this: MVideoChapter, options: {
        video: MVideo;
        nextChapter: MVideoChapter;
    }): VideoChapterObject;
    toFormattedJSON(this: MVideoChapter): VideoChapter;
}
//# sourceMappingURL=video-chapter.d.ts.map