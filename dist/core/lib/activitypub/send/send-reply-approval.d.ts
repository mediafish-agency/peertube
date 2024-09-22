import { ActivityApproveReply, ActivityRejectReply } from '@peertube/peertube-models';
import { MCommentOwnerVideoReply } from '../../../types/models/index.js';
export declare function sendReplyApproval(comment: MCommentOwnerVideoReply, type: 'ApproveReply'): void;
export declare function buildApprovalActivity(options: {
    comment: MCommentOwnerVideoReply;
    type: 'ApproveReply';
}): ActivityApproveReply | ActivityRejectReply;
//# sourceMappingURL=send-reply-approval.d.ts.map