import { type VideoPrivacyType } from '@peertube/peertube-models';
import { MLiveReplaySetting } from '../../types/models/video/video-live-replay-setting.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
export declare class VideoLiveReplaySettingModel extends SequelizeModel<VideoLiveReplaySettingModel> {
    createdAt: Date;
    updatedAt: Date;
    privacy: VideoPrivacyType;
    static load(id: number, transaction?: Transaction): Promise<MLiveReplaySetting>;
    static removeSettings(id: number): Promise<number>;
    toFormattedJSON(): {
        privacy: VideoPrivacyType;
    };
}
//# sourceMappingURL=video-live-replay-setting.d.ts.map