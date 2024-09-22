import { VideoModel } from '../video/video.js';
import { SequelizeModel } from '../shared/index.js';
export declare class VideoViewModel extends SequelizeModel<VideoViewModel> {
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    views: number;
    videoId: number;
    Video: Awaited<VideoModel>;
    static removeOldRemoteViewsHistory(beforeDate: string): Promise<number>;
}
//# sourceMappingURL=video-view.d.ts.map