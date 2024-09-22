import { Activity } from '@peertube/peertube-models';
import { MActorDefault, MActorSignature } from '../../../types/models/index.js';
export declare function processActivities(activities: Activity[], options?: {
    signatureActor?: MActorSignature;
    inboxActor?: MActorDefault;
    outboxUrl?: string;
    fromFetch?: boolean;
}): Promise<void>;
//# sourceMappingURL=process.d.ts.map