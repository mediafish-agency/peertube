import { AbuseFilter, AbusePredefinedReasonsString, AbuseVideoIs } from '@peertube/peertube-models';
declare function isAbuseReasonValid(value: string): boolean;
declare function isAbusePredefinedReasonValid(value: AbusePredefinedReasonsString): boolean;
declare function isAbuseFilterValid(value: AbuseFilter): value is "video" | "account" | "comment";
declare function areAbusePredefinedReasonsValid(value: AbusePredefinedReasonsString[]): boolean;
declare function isAbuseTimestampValid(value: number): boolean;
declare function isAbuseTimestampCoherent(endAt: number, { req }: {
    req: any;
}): boolean;
declare function isAbuseModerationCommentValid(value: string): boolean;
declare function isAbuseStateValid(value: string): boolean;
declare function isAbuseVideoIsValid(value: AbuseVideoIs): boolean;
declare function isAbuseMessageValid(value: string): boolean;
export { isAbuseReasonValid, isAbuseFilterValid, isAbusePredefinedReasonValid, isAbuseMessageValid, areAbusePredefinedReasonsValid, isAbuseTimestampValid, isAbuseTimestampCoherent, isAbuseModerationCommentValid, isAbuseStateValid, isAbuseVideoIsValid };
//# sourceMappingURL=abuses.d.ts.map