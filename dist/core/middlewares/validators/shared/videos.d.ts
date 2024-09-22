import { UserRightType } from '@peertube/peertube-models';
import { VideoLoadType } from '../../../lib/model-loaders/index.js';
import { MUser, MUserAccountId, MUserId, MVideo, MVideoAccountLight, MVideoId, MVideoWithRights } from '../../../types/models/index.js';
import { Request, Response } from 'express';
export declare function doesVideoExist(id: number | string, res: Response, fetchType?: VideoLoadType): Promise<boolean>;
export declare function doesVideoFileOfVideoExist(id: number, videoIdOrUUID: number | string, res: Response): Promise<boolean>;
export declare function doesVideoChannelOfAccountExist(channelId: number, user: MUserAccountId, res: Response): Promise<boolean>;
export declare function checkCanSeeVideo(options: {
    req: Request;
    res: Response;
    paramId: string;
    video: MVideo;
}): Promise<boolean>;
export declare function checkCanSeeUserAuthVideo(options: {
    req: Request;
    res: Response;
    video: MVideoId | MVideoWithRights;
}): Promise<boolean>;
export declare function checkCanSeePasswordProtectedVideo(options: {
    req: Request;
    res: Response;
    video: MVideo;
}): Promise<boolean>;
export declare function canUserAccessVideo(user: MUser, video: MVideoWithRights | MVideoAccountLight, right: UserRightType): boolean;
export declare function getVideoWithRights(video: MVideoWithRights): Promise<MVideoWithRights>;
export declare function checkCanAccessVideoStaticFiles(options: {
    video: MVideo;
    req: Request;
    res: Response;
    paramId: string;
}): Promise<boolean>;
export declare function checkCanAccessVideoSourceFile(options: {
    videoId: number;
    req: Request;
    res: Response;
}): Promise<boolean>;
export declare function checkUserCanManageVideo(user: MUser, video: MVideoAccountLight, right: UserRightType, res: Response, onlyOwned?: boolean): boolean;
export declare function checkUserQuota(user: MUserId, videoFileSize: number, res: Response): Promise<boolean>;
//# sourceMappingURL=videos.d.ts.map