import { Transaction } from 'sequelize';
import { ActivityPubActorType, ActorImageType_Type } from '@peertube/peertube-models';
import { MAccountDefault, MActor, MChannelDefault } from '../types/models/index.js';
export declare function buildActorInstance(type: ActivityPubActorType, url: string, preferredUsername: string): MActor;
export declare function updateLocalActorImageFiles(options: {
    accountOrChannel: MAccountDefault | MChannelDefault;
    imagePhysicalFile: {
        path: string;
    };
    type: ActorImageType_Type;
    sendActorUpdate: boolean;
}): Promise<import("../models/actor/actor-image.js").ActorImageModel[]>;
export declare function deleteLocalActorImageFile(accountOrChannel: MAccountDefault | MChannelDefault, type: ActorImageType_Type): Promise<import("../models/actor/actor-image.js").ActorImageModel[] & import("../models/actor/actor-image.js").ActorImageModel[]>;
export declare function findAvailableLocalActorName(baseActorName: string, transaction?: Transaction): Promise<string>;
//# sourceMappingURL=local-actor.d.ts.map