import { ActivityPubActor, ActorImageType_Type } from '@peertube/peertube-models';
import { ActorModel } from '../../../../models/actor/actor.js';
import { FilteredModelAttributes } from '../../../../types/index.js';
declare function getActorAttributesFromObject(actorObject: ActivityPubActor, followersCount: number, followingCount: number): FilteredModelAttributes<ActorModel>;
declare function getImagesInfoFromObject(actorObject: ActivityPubActor, type: ActorImageType_Type): {
    name: string;
    fileUrl: string;
    height: number;
    width: number;
    type: ActorImageType_Type;
}[];
declare function getActorDisplayNameFromObject(actorObject: ActivityPubActor): string;
export { getActorAttributesFromObject, getImagesInfoFromObject, getActorDisplayNameFromObject };
//# sourceMappingURL=object-to-model-attributes.d.ts.map