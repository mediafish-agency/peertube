import { LiveVideo, type LiveVideoLatencyModeType } from '@peertube/peertube-models';
import { MVideoLive, MVideoLiveVideoWithSetting, MVideoLiveWithSetting } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { VideoLiveReplaySettingModel } from './video-live-replay-setting.js';
import { VideoModel } from './video.js';
import { SequelizeModel } from '../shared/index.js';
export declare class VideoLiveModel extends SequelizeModel<VideoLiveModel> {
    streamKey: string;
    saveReplay: boolean;
    permanentLive: boolean;
    latencyMode: LiveVideoLatencyModeType;
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    Video: Awaited<VideoModel>;
    replaySettingId: number;
    ReplaySetting: Awaited<VideoLiveReplaySettingModel>;
    static deleteReplaySetting(instance: VideoLiveModel, options: {
        transaction: Transaction;
    }): Promise<number>;
    static loadByStreamKey(streamKey: string): Promise<MVideoLiveVideoWithSetting>;
    static loadByVideoId(videoId: number): Promise<MVideoLive>;
    static loadByVideoIdWithSettings(videoId: number): Promise<MVideoLiveWithSetting>;
    toFormattedJSON(canSeePrivateInformation: boolean): LiveVideo;
}
//# sourceMappingURL=video-live.d.ts.map