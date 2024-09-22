import { ActivityIconObject, ActorImage, type ActorImageType_Type } from '@peertube/peertube-models';
import { MActorId, MActorImage, MActorImageFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { ActorModel } from './actor.js';
export declare class ActorImageModel extends SequelizeModel<ActorImageModel> {
    filename: string;
    height: number;
    width: number;
    fileUrl: string;
    onDisk: boolean;
    type: ActorImageType_Type;
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    Actor: Awaited<ActorModel>;
    static removeFile(instance: ActorImageModel): void;
    static getSQLAttributes(tableName: string, aliasPrefix?: string): string[];
    static loadByFilename(filename: string): Promise<ActorImageModel>;
    static listByActor(actor: MActorId, type: ActorImageType_Type): Promise<ActorImageModel[]>;
    static listActorImages(actor: MActorId): Promise<{
        avatars: ActorImageModel[];
        banners: ActorImageModel[];
    }>;
    static listRemoteOnDisk(): Promise<ActorImageModel[]>;
    static getImageUrl(image: MActorImage): string;
    toFormattedJSON(this: MActorImageFormattable): ActorImage;
    toActivityPubObject(): ActivityIconObject;
    getStaticPath(): string;
    getPath(): string;
    removeImage(): Promise<void>;
    isOwned(): boolean;
}
//# sourceMappingURL=actor-image.d.ts.map