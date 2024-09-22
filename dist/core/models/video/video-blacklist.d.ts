import { VideoBlacklist, type VideoBlacklistType_Type } from '@peertube/peertube-models';
import { MVideoBlacklist, MVideoBlacklistFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class VideoBlacklistModel extends SequelizeModel<VideoBlacklistModel> {
    reason: string;
    unfederated: boolean;
    type: VideoBlacklistType_Type;
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    Video: Awaited<VideoModel>;
    static listForApi(parameters: {
        start: number;
        count: number;
        sort: string;
        search?: string;
        type?: VideoBlacklistType_Type;
    }): Promise<{
        data: VideoBlacklistModel[];
        total: number;
    }>;
    static loadByVideoId(id: number): Promise<MVideoBlacklist>;
    toFormattedJSON(this: MVideoBlacklistFormattable): VideoBlacklist;
}
//# sourceMappingURL=video-blacklist.d.ts.map