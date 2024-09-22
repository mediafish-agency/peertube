import { LiveVideoSession, type LiveVideoErrorType } from '@peertube/peertube-models';
import { MVideoLiveSession, MVideoLiveSessionReplay } from '../../types/models/index.js';
import { VideoLiveReplaySettingModel } from './video-live-replay-setting.js';
import { VideoModel } from './video.js';
import { SequelizeModel } from '../shared/index.js';
export declare enum ScopeNames {
    WITH_REPLAY = "WITH_REPLAY"
}
export declare class VideoLiveSessionModel extends SequelizeModel<VideoLiveSessionModel> {
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    endDate: Date;
    error: LiveVideoErrorType;
    saveReplay: boolean;
    endingProcessed: boolean;
    replayVideoId: number;
    ReplayVideo: Awaited<VideoModel>;
    liveVideoId: number;
    LiveVideo: Awaited<VideoModel>;
    replaySettingId: number;
    ReplaySetting: Awaited<VideoLiveReplaySettingModel>;
    static deleteReplaySetting(instance: VideoLiveSessionModel): Promise<number>;
    static load(id: number): Promise<MVideoLiveSession>;
    static findSessionOfReplay(replayVideoId: number): Promise<VideoLiveSessionModel>;
    static findCurrentSessionOf(videoUUID: string): Promise<VideoLiveSessionModel>;
    static findLatestSessionOf(videoId: number): Promise<VideoLiveSessionModel>;
    static listSessionsOfLiveForAPI(options: {
        videoId: number;
    }): Promise<VideoLiveSessionModel[]>;
    toFormattedJSON(this: MVideoLiveSessionReplay): LiveVideoSession;
}
//# sourceMappingURL=video-live-session.d.ts.map