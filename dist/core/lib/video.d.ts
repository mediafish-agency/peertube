import { VideoCommentPolicyType } from '@peertube/peertube-models';
import { MVideoTag } from '../types/models/index.js';
import memoizee from 'memoizee';
import { Transaction } from 'sequelize';
export declare function setVideoTags(options: {
    video: MVideoTag;
    tags: string[];
    transaction?: Transaction;
}): Promise<void>;
declare function getVideoDuration(videoId: number | string): Promise<{
    duration: number;
    isLive: boolean;
}>;
export declare const getCachedVideoDuration: typeof getVideoDuration & memoizee.Memoized<typeof getVideoDuration>;
export declare function buildCommentsPolicy(options: {
    commentsEnabled?: boolean;
    commentsPolicy?: VideoCommentPolicyType;
}): VideoCommentPolicyType;
export {};
//# sourceMappingURL=video.d.ts.map