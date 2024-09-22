import { Transaction } from 'sequelize';
import { VideoPrivacy } from '@peertube/peertube-models';
import { MScheduleVideoUpdate, MScheduleVideoUpdateFormattable } from '../../types/models/index.js';
import { VideoModel } from './video.js';
import { SequelizeModel } from '../shared/index.js';
export declare class ScheduleVideoUpdateModel extends SequelizeModel<ScheduleVideoUpdateModel> {
    updateAt: Date;
    privacy: typeof VideoPrivacy.PUBLIC | typeof VideoPrivacy.UNLISTED | typeof VideoPrivacy.INTERNAL;
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    Video: Awaited<VideoModel>;
    static areVideosToUpdate(): Promise<boolean>;
    static listVideosToUpdate(transaction?: Transaction): Promise<MScheduleVideoUpdate[]>;
    static deleteByVideoId(videoId: number, t: Transaction): Promise<number>;
    toFormattedJSON(this: MScheduleVideoUpdateFormattable): {
        updateAt: Date;
        privacy: 1 | 2 | 4;
    };
}
//# sourceMappingURL=schedule-video-update.d.ts.map