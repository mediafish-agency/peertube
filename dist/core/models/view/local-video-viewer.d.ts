import { MLocalVideoViewer, MLocalVideoViewerWithWatchSections, MVideo } from '../../types/models/index.js';
import { VideoStatsOverall, VideoStatsRetention, VideoStatsTimeserie, VideoStatsTimeserieMetric, WatchActionObject } from '@peertube/peertube-models';
import { VideoModel } from '../video/video.js';
import { LocalVideoViewerWatchSectionModel } from './local-video-viewer-watch-section.js';
import { SequelizeModel } from '../shared/index.js';
export declare class LocalVideoViewerModel extends SequelizeModel<LocalVideoViewerModel> {
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    watchTime: number;
    country: string;
    subdivisionName: string;
    uuid: string;
    url: string;
    videoId: number;
    Video: Awaited<VideoModel>;
    WatchSections: Awaited<LocalVideoViewerWatchSectionModel>[];
    static loadByUrl(url: string): Promise<MLocalVideoViewer>;
    static loadFullById(id: number): Promise<MLocalVideoViewerWithWatchSections>;
    static getOverallStats(options: {
        video: MVideo;
        startDate?: string;
        endDate?: string;
    }): Promise<VideoStatsOverall>;
    static getRetentionStats(video: MVideo): Promise<VideoStatsRetention>;
    static getTimeserieStats(options: {
        video: MVideo;
        metric: VideoStatsTimeserieMetric;
        startDate: string;
        endDate: string;
    }): Promise<VideoStatsTimeserie>;
    toActivityPubObject(this: MLocalVideoViewerWithWatchSections): WatchActionObject;
}
//# sourceMappingURL=local-video-viewer.d.ts.map