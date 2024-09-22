import { ActorLoadByUrlType } from '../../model-loaders/index.js';
import { MActorAccountChannelId, MActorFull } from '../../../types/models/index.js';
type RefreshResult<T> = Promise<{
    actor: T | MActorFull;
    refreshed: boolean;
}>;
type RefreshOptions<T> = {
    actor: T;
    fetchedType: ActorLoadByUrlType;
};
declare function refreshActorIfNeeded<T extends MActorFull | MActorAccountChannelId>(options: RefreshOptions<T>): RefreshResult<T>;
export { refreshActorIfNeeded };
//# sourceMappingURL=refresh.d.ts.map