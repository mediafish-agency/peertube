import { type VideoDetails } from '@peertube/peertube-models';
import { VideoModel } from '../video/video.js';
import { AbuseModel } from './abuse.js';
import { SequelizeModel } from '../shared/index.js';
export declare class VideoAbuseModel extends SequelizeModel<VideoAbuseModel> {
    createdAt: Date;
    updatedAt: Date;
    startAt: number;
    endAt: number;
    deletedVideo: VideoDetails;
    abuseId: number;
    Abuse: Awaited<AbuseModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
}
//# sourceMappingURL=video-abuse.d.ts.map