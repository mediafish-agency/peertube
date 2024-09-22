import { Transaction } from 'sequelize';
import { MVideo, MVideoWithHost } from '../../../../types/models/index.js';
import { VideoObject } from '@peertube/peertube-models';
declare function getTrackerUrls(object: VideoObject, video: MVideoWithHost): string[];
declare function setVideoTrackers(options: {
    video: MVideo;
    trackers: string[];
    transaction: Transaction;
}): Promise<void>;
export { getTrackerUrls, setVideoTrackers };
//# sourceMappingURL=trackers.d.ts.map