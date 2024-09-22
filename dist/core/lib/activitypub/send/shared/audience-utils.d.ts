import { ActivityAudience } from '@peertube/peertube-models';
import { MActorFollowersUrl, MActorUrl, MCommentOwner, MCommentOwnerVideo, MVideoId } from '../../../../types/models/index.js';
import { Transaction } from 'sequelize';
export declare function getOriginVideoAudience(accountActor: MActorUrl, actorsInvolvedInVideo?: MActorFollowersUrl[]): ActivityAudience;
export declare function getVideoCommentAudience(videoComment: MCommentOwnerVideo, threadParentComments: MCommentOwner[], actorsInvolvedInVideo: MActorFollowersUrl[], isOrigin?: boolean): ActivityAudience;
export declare function getAudienceFromFollowersOf(actorsInvolvedInObject: MActorFollowersUrl[]): ActivityAudience;
export declare function getActorsInvolvedInVideo(video: MVideoId, t: Transaction): Promise<(import("../../../../types/models/index.js").MActorId & MActorFollowersUrl)[]>;
//# sourceMappingURL=audience-utils.d.ts.map