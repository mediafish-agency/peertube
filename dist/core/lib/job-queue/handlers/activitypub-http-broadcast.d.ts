import { Job } from 'bullmq';
import { ActivitypubHttpBroadcastPayload } from '@peertube/peertube-models';
declare function processActivityPubHttpSequentialBroadcast(job: Job<ActivitypubHttpBroadcastPayload>): Promise<void>;
declare function processActivityPubParallelHttpBroadcast(job: Job<ActivitypubHttpBroadcastPayload>): Promise<void>;
export { processActivityPubHttpSequentialBroadcast, processActivityPubParallelHttpBroadcast };
//# sourceMappingURL=activitypub-http-broadcast.d.ts.map