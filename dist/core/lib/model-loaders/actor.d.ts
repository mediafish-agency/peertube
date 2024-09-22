import { MActorAccountChannelId, MActorFull } from '../../types/models/index.js';
type ActorLoadByUrlType = 'all' | 'association-ids';
declare function loadActorByUrl(url: string, fetchType: ActorLoadByUrlType): Promise<MActorFull | MActorAccountChannelId>;
export { type ActorLoadByUrlType, loadActorByUrl };
//# sourceMappingURL=actor.d.ts.map