import { Account } from '../../actors/index.js';
import { Video } from '../video.model.js';
export interface VideoChangeOwnership {
    id: number;
    status: VideoChangeOwnershipStatusType;
    initiatorAccount: Account;
    nextOwnerAccount: Account;
    video: Video;
    createdAt: Date;
}
export declare const VideoChangeOwnershipStatus: {
    readonly WAITING: "WAITING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REFUSED: "REFUSED";
};
export type VideoChangeOwnershipStatusType = typeof VideoChangeOwnershipStatus[keyof typeof VideoChangeOwnershipStatus];
//# sourceMappingURL=video-change-ownership.model.d.ts.map