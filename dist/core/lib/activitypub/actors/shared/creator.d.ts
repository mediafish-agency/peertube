import { ActivityPubActor } from '@peertube/peertube-models';
import { MActorFullActor } from '../../../../types/models/index.js';
export declare class APActorCreator {
    private readonly actorObject;
    private readonly ownerActor?;
    constructor(actorObject: ActivityPubActor, ownerActor?: MActorFullActor);
    create(): Promise<MActorFullActor>;
    private setServer;
    private setImageIfNeeded;
    private saveActor;
    private tryToFixActorUrlIfNeeded;
    private saveAccount;
    private saveVideoChannel;
}
//# sourceMappingURL=creator.d.ts.map