import { MUserId } from '../../types/models/index.js';
export declare function getTranscodingJobPriority(options: {
    user: MUserId;
    fallback: number;
    type: 'vod' | 'studio';
}): Promise<number>;
//# sourceMappingURL=transcoding-priority.d.ts.map