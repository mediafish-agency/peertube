import { ActivityApproveReply, ActivityRejectReply, ActivityType } from '@peertube/peertube-models';
import { APProcessorOptions } from '../../../types/activitypub-processor.model.js';
export declare function processReplyApprovalFactory(type: Extract<ActivityType, 'ApproveReply' | 'RejectReply'>): (options: APProcessorOptions<ActivityApproveReply | ActivityRejectReply>) => Promise<void>;
//# sourceMappingURL=process-reply-approval.d.ts.map