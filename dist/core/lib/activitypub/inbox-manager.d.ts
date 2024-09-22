import { MActorDefault, MActorSignature } from '../../types/models/index.js';
import { Activity } from '@peertube/peertube-models';
export declare class InboxManager {
    private static instance;
    private readonly inboxQueue;
    private constructor();
    addInboxMessage(param: {
        activities: Activity[];
        signatureActor?: MActorSignature;
        inboxActor?: MActorDefault;
    }): void;
    getActivityPubMessagesWaiting(): number;
    static get Instance(): InboxManager;
}
//# sourceMappingURL=inbox-manager.d.ts.map