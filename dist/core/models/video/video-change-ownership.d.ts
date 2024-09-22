import { VideoChangeOwnership, type VideoChangeOwnershipStatusType } from '@peertube/peertube-models';
import { MVideoChangeOwnershipFormattable, MVideoChangeOwnershipFull } from '../../types/models/video/video-change-ownership.js';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class VideoChangeOwnershipModel extends SequelizeModel<VideoChangeOwnershipModel> {
    createdAt: Date;
    updatedAt: Date;
    status: VideoChangeOwnershipStatusType;
    initiatorAccountId: number;
    Initiator: Awaited<AccountModel>;
    nextOwnerAccountId: number;
    NextOwner: Awaited<AccountModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
    static listForApi(nextOwnerId: number, start: number, count: number, sort: string): Promise<{
        total: number;
        data: MVideoChangeOwnershipFull[];
    }>;
    static load(id: number): Promise<MVideoChangeOwnershipFull>;
    toFormattedJSON(this: MVideoChangeOwnershipFormattable): VideoChangeOwnership;
}
//# sourceMappingURL=video-change-ownership.d.ts.map