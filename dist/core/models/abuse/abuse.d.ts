import { AbuseFilter, AbuseObject, AbusePredefinedReasonsString, AbusePredefinedReasonsType, AbuseVideoIs, AdminAbuse, UserAbuse, UserVideoAbuse, type AbuseStateType } from '@peertube/peertube-models';
import { MAbuseAP, MAbuseAdminFormattable, MAbuseFull, MAbuseReporter, MAbuseUserFormattable, MUserAccountId } from '../../types/models/index.js';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoAbuseModel } from './video-abuse.js';
import { VideoCommentAbuseModel } from './video-comment-abuse.js';
export declare enum ScopeNames {
    FOR_API = "FOR_API"
}
export declare class AbuseModel extends SequelizeModel<AbuseModel> {
    reason: string;
    state: AbuseStateType;
    moderationComment: string;
    predefinedReasons: AbusePredefinedReasonsType[];
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    reporterAccountId: number;
    ReporterAccount: Awaited<AccountModel>;
    flaggedAccountId: number;
    FlaggedAccount: Awaited<AccountModel>;
    VideoCommentAbuse: Awaited<VideoCommentAbuseModel>;
    VideoAbuse: Awaited<VideoAbuseModel>;
    static loadByIdWithReporter(id: number): Promise<MAbuseReporter>;
    static loadFull(id: number): Promise<MAbuseFull>;
    static listForAdminApi(parameters: {
        start: number;
        count: number;
        sort: string;
        filter?: AbuseFilter;
        serverAccountId: number;
        user?: MUserAccountId;
        id?: number;
        predefinedReason?: AbusePredefinedReasonsString;
        state?: AbuseStateType;
        videoIs?: AbuseVideoIs;
        search?: string;
        searchReporter?: string;
        searchReportee?: string;
        searchVideo?: string;
        searchVideoChannel?: string;
    }): Promise<{
        total: number;
        data: AbuseModel[];
    }>;
    static listForUserApi(parameters: {
        user: MUserAccountId;
        start: number;
        count: number;
        sort: string;
        id?: number;
        search?: string;
        state?: AbuseStateType;
    }): Promise<{
        total: number;
        data: AbuseModel[];
    }>;
    static getStats(): Promise<{
        totalAbuses: number;
        totalAbusesProcessed: number;
        averageAbuseResponseTimeMs: number;
    }>;
    buildBaseVideoCommentAbuse(this: MAbuseUserFormattable): {
        id: number;
        threadId: number;
        text: string;
        deleted: boolean;
        video: {
            id: number;
            name: string;
            uuid: string;
        };
    };
    buildBaseVideoAbuse(this: MAbuseUserFormattable): UserVideoAbuse;
    buildBaseAbuse(this: MAbuseUserFormattable, countMessages: number): UserAbuse;
    toFormattedAdminJSON(this: MAbuseAdminFormattable): AdminAbuse;
    toFormattedUserJSON(this: MAbuseUserFormattable): UserAbuse;
    toActivityPubObject(this: MAbuseAP): AbuseObject;
    private static internalCountForApi;
    private static internalListForApi;
    private static getStateLabel;
    private static getPredefinedReasonsStrings;
}
//# sourceMappingURL=abuse.d.ts.map