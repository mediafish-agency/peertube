import { ActivityPubActor, APObjectId } from '@peertube/peertube-models';
import { MActorAccountChannelId, MActorFullActor } from '../../../types/models/index.js';
declare function getOrCreateAPActor(activityActor: string | ActivityPubActor, fetchType: 'all', recurseIfNeeded?: boolean, updateCollections?: boolean): Promise<MActorFullActor>;
declare function getOrCreateAPActor(activityActor: string | ActivityPubActor, fetchType?: 'association-ids', recurseIfNeeded?: boolean, updateCollections?: boolean): Promise<MActorAccountChannelId>;
declare function getOrCreateAPOwner(actorObject: ActivityPubActor, actorUrl: string): Promise<MActorFullActor>;
declare function findOwner(rootUrl: string, attributedTo: APObjectId[] | APObjectId, type: 'Person' | 'Group'): Promise<ActivityPubActor>;
export { getOrCreateAPOwner, getOrCreateAPActor, findOwner };
//# sourceMappingURL=get.d.ts.map