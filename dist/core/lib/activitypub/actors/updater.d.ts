import { MActorFull } from '../../../types/models/index.js';
import { ActivityPubActor } from '@peertube/peertube-models';
export declare class APActorUpdater {
    private readonly actorObject;
    private readonly actor;
    private readonly accountOrChannel;
    constructor(actorObject: ActivityPubActor, actor: MActorFull);
    update(): Promise<void>;
    private updateActorInstance;
}
//# sourceMappingURL=updater.d.ts.map