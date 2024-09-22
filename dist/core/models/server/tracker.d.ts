import { Transaction } from 'sequelize';
import { MTracker } from '../../types/models/server/tracker.js';
import { VideoModel } from '../video/video.js';
import { SequelizeModel } from '../shared/sequelize-type.js';
export declare class TrackerModel extends SequelizeModel<TrackerModel> {
    url: string;
    createdAt: Date;
    updatedAt: Date;
    Videos: Awaited<VideoModel>[];
    static listUrlsByVideoId(videoId: number): Promise<string[]>;
    static findOrCreateTrackers(trackers: string[], transaction: Transaction): Promise<MTracker[]>;
}
//# sourceMappingURL=tracker.d.ts.map