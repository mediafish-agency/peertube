import { AbuseFilter, AbuseMessage, AbusePredefinedReasonsString, AbuseStateType, AbuseUpdate, AbuseVideoIs, AdminAbuse, ResultList, UserAbuse } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class AbusesCommand extends AbstractCommand {
    report(options: OverrideCommandOptions & {
        reason: string;
        accountId?: number;
        videoId?: number;
        commentId?: number;
        predefinedReasons?: AbusePredefinedReasonsString[];
        startAt?: number;
        endAt?: number;
    }): Promise<{
        abuse: {
            id: number;
        };
    }>;
    getAdminList(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        id?: number;
        predefinedReason?: AbusePredefinedReasonsString;
        search?: string;
        filter?: AbuseFilter;
        state?: AbuseStateType;
        videoIs?: AbuseVideoIs;
        searchReporter?: string;
        searchReportee?: string;
        searchVideo?: string;
        searchVideoChannel?: string;
    }): Promise<ResultList<AdminAbuse>>;
    getUserList(options: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        id?: number;
        search?: string;
        state?: AbuseStateType;
    }): Promise<ResultList<UserAbuse>>;
    update(options: OverrideCommandOptions & {
        abuseId: number;
        body: AbuseUpdate;
    }): import("supertest").Test;
    delete(options: OverrideCommandOptions & {
        abuseId: number;
    }): import("supertest").Test;
    listMessages(options: OverrideCommandOptions & {
        abuseId: number;
    }): Promise<ResultList<AbuseMessage>>;
    deleteMessage(options: OverrideCommandOptions & {
        abuseId: number;
        messageId: number;
    }): import("supertest").Test;
    addMessage(options: OverrideCommandOptions & {
        abuseId: number;
        message: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=abuses-command.d.ts.map