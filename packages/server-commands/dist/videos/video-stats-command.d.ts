import { VideoStatsOverall, VideoStatsRetention, VideoStatsTimeserie, VideoStatsTimeserieMetric } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class VideoStatsCommand extends AbstractCommand {
    getOverallStats(options: OverrideCommandOptions & {
        videoId: number | string;
        startDate?: string;
        endDate?: string;
    }): Promise<VideoStatsOverall>;
    getTimeserieStats(options: OverrideCommandOptions & {
        videoId: number | string;
        metric: VideoStatsTimeserieMetric;
        startDate?: Date;
        endDate?: Date;
    }): Promise<VideoStatsTimeserie>;
    getRetentionStats(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<VideoStatsRetention>;
}
//# sourceMappingURL=video-stats-command.d.ts.map