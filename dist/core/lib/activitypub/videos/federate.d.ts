import { VideoPrivacyType, VideoStateType } from '@peertube/peertube-models';
import { MVideoAPLight, MVideoWithBlacklistRights } from '../../../types/models/index.js';
import { Transaction } from 'sequelize';
export declare function federateVideoIfNeeded(videoArg: MVideoAPLight, isNewVideo: boolean, transaction?: Transaction): Promise<void>;
export declare function canVideoBeFederated(video: MVideoWithBlacklistRights, isNewVideo?: boolean): boolean;
export declare function isNewVideoPrivacyForFederation(currentPrivacy: VideoPrivacyType, newPrivacy: VideoPrivacyType): boolean;
export declare function isPrivacyForFederation(privacy: VideoPrivacyType): boolean;
export declare function isStateForFederation(state: VideoStateType): boolean;
//# sourceMappingURL=federate.d.ts.map