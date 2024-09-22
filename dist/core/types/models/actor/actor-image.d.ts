import { FunctionProperties } from '@peertube/peertube-typescript-utils';
import { ActorImageModel } from '../../../models/actor/actor-image.js';
export type MActorImage = ActorImageModel;
export type MActorImageFormattable = FunctionProperties<MActorImage> & Pick<MActorImage, 'width' | 'filename' | 'createdAt' | 'updatedAt'>;
//# sourceMappingURL=actor-image.d.ts.map