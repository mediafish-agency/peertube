import { AbuseFilter, AbuseStateType, AbuseVideoIs } from '@peertube/peertube-models';
export type BuildAbusesQueryOptions = {
    start: number;
    count: number;
    sort: string;
    search?: string;
    searchReporter?: string;
    searchReportee?: string;
    searchVideo?: string;
    searchVideoChannel?: string;
    videoIs?: AbuseVideoIs;
    id?: number;
    predefinedReasonId?: number;
    filter?: AbuseFilter;
    state?: AbuseStateType;
    serverAccountId?: number;
    userAccountId?: number;
    reporterAccountId?: number;
};
declare function buildAbuseListQuery(options: BuildAbusesQueryOptions, type: 'count' | 'id'): {
    query: string;
    replacements: any;
};
export { buildAbuseListQuery };
//# sourceMappingURL=abuse-query-builder.d.ts.map