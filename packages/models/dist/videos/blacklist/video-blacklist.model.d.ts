import { Video } from '../video.model.js';
export declare const VideoBlacklistType: {
    readonly MANUAL: 1;
    readonly AUTO_BEFORE_PUBLISHED: 2;
};
export type VideoBlacklistType_Type = typeof VideoBlacklistType[keyof typeof VideoBlacklistType];
export interface VideoBlacklist {
    id: number;
    unfederated: boolean;
    reason?: string;
    type: VideoBlacklistType_Type;
    video: Video;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=video-blacklist.model.d.ts.map