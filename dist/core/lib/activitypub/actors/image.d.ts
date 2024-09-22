import { ActorImageType_Type } from '@peertube/peertube-models';
import { MActorImages } from '../../../types/models/index.js';
import { Transaction } from 'sequelize';
type ImageInfo = {
    name: string;
    fileUrl: string;
    height: number;
    width: number;
    onDisk?: boolean;
};
declare function updateActorImages(actor: MActorImages, type: ActorImageType_Type, imagesInfo: ImageInfo[], t: Transaction): Promise<MActorImages>;
declare function deleteActorImages(actor: MActorImages, type: ActorImageType_Type, t: Transaction): Promise<MActorImages>;
export { type ImageInfo, updateActorImages, deleteActorImages };
//# sourceMappingURL=image.d.ts.map