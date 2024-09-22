import { Transaction } from 'sequelize';
import { Activity, ActivityAudience, ContextType } from '@peertube/peertube-models';
import { MActor, MActorId, MActorLight, MActorWithInboxes, MVideoAccountLight, MVideoId, MVideoImmutable } from '../../../../types/models/index.js';
declare function sendVideoRelatedActivity(activityBuilder: (audience: ActivityAudience) => Activity, options: {
    byActor: MActorLight;
    video: MVideoImmutable | MVideoAccountLight;
    contextType: ContextType;
    parallelizable?: boolean;
    transaction?: Transaction;
}): Promise<any>;
declare function sendVideoActivityToOrigin(activityBuilder: (audience: ActivityAudience) => Activity, options: {
    byActor: MActorLight;
    video: MVideoImmutable | MVideoAccountLight;
    contextType: ContextType;
    actorsInvolvedInVideo?: MActorLight[];
    transaction?: Transaction;
}): Promise<any>;
declare function forwardVideoRelatedActivity(activity: Activity, t: Transaction, followersException: MActorWithInboxes[], video: MVideoId): Promise<any>;
declare function broadcastToFollowers(options: {
    data: any;
    byActor: MActorId;
    toFollowersOf: MActorId[];
    transaction: Transaction;
    contextType: ContextType;
    parallelizable?: boolean;
    actorsException?: MActorWithInboxes[];
}): Promise<any>;
declare function broadcastToActors(options: {
    data: any;
    byActor: MActorId;
    toActors: MActor[];
    transaction: Transaction;
    contextType: ContextType;
    actorsException?: MActorWithInboxes[];
}): Promise<any>;
declare function unicastTo(options: {
    data: any;
    byActor: MActorId;
    toActorUrl: string;
    contextType: ContextType;
}): void;
export { broadcastToFollowers, unicastTo, broadcastToActors, sendVideoActivityToOrigin, forwardVideoRelatedActivity, sendVideoRelatedActivity };
//# sourceMappingURL=send-utils.d.ts.map