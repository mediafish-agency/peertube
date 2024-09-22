import { ActorImageModel } from '../../models/actor/actor-image.js';
import { MActorImage } from '../../types/models/index.js';
import { AbstractPermanentFileCache } from './shared/index.js';
export declare class AvatarPermanentFileCache extends AbstractPermanentFileCache<MActorImage> {
    constructor();
    protected loadModel(filename: string): Promise<ActorImageModel>;
    protected getImageSize(image: MActorImage): {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=avatar-permanent-file-cache.d.ts.map