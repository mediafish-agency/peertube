import { ActorModel } from '../../models/actor/actor.js';
declare function addFetchOutboxJob(actor: Pick<ActorModel, 'id' | 'outboxUrl'>): Promise<void>;
export { addFetchOutboxJob };
//# sourceMappingURL=outbox.d.ts.map