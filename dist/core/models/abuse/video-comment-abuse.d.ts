import { VideoCommentModel } from '../video/video-comment.js';
import { AbuseModel } from './abuse.js';
import { SequelizeModel } from '../shared/index.js';
export declare class VideoCommentAbuseModel extends SequelizeModel<VideoCommentAbuseModel> {
    createdAt: Date;
    updatedAt: Date;
    abuseId: number;
    Abuse: Awaited<AbuseModel>;
    videoCommentId: number;
    VideoComment: Awaited<VideoCommentModel>;
}
//# sourceMappingURL=video-comment-abuse.d.ts.map