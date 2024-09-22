import { ActivityTombstoneObject, VideoComment, VideoCommentForAdminOrUser, VideoCommentObject } from '@peertube/peertube-models';
import { MAccount, MAccountId, MUserAccountId } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { MComment, MCommentAP, MCommentAdminOrUserFormattable, MCommentExport, MCommentFormattable, MCommentId, MCommentOwner, MCommentOwnerReplyVideoImmutable, MCommentOwnerVideoFeed, MCommentOwnerVideoReply, MVideo, MVideoImmutable } from '../../types/models/video/index.js';
import { VideoCommentAbuseModel } from '../abuse/video-comment-abuse.js';
import { AccountModel } from '../account/account.js';
import { CommentAutomaticTagModel } from '../automatic-tag/comment-automatic-tag.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare enum ScopeNames {
    WITH_ACCOUNT = "WITH_ACCOUNT",
    WITH_IN_REPLY_TO = "WITH_IN_REPLY_TO",
    WITH_VIDEO = "WITH_VIDEO"
}
export declare class VideoCommentModel extends SequelizeModel<VideoCommentModel> {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    url: string;
    text: string;
    heldForReview: boolean;
    replyApproval: string;
    originCommentId: number;
    OriginVideoComment: Awaited<VideoCommentModel>;
    inReplyToCommentId: number;
    InReplyToVideoComment: Awaited<VideoCommentModel> | null;
    videoId: number;
    Video: Awaited<VideoModel>;
    accountId: number;
    Account: Awaited<AccountModel>;
    CommentAbuses: Awaited<VideoCommentAbuseModel>[];
    CommentAutomaticTags: Awaited<CommentAutomaticTagModel>[];
    static getSQLAttributes(tableName: string, aliasPrefix?: string): string[];
    static loadById(id: number, transaction?: Transaction): Promise<MComment>;
    static loadByIdAndPopulateVideoAndAccountAndReply(id: number, transaction?: Transaction): Promise<MCommentOwnerVideoReply>;
    static loadByUrlAndPopulateAccountAndVideoAndReply(url: string, transaction?: Transaction): Promise<MCommentOwnerVideoReply>;
    static loadByUrlAndPopulateReplyAndVideoImmutableAndAccount(url: string, transaction?: Transaction): Promise<MCommentOwnerReplyVideoImmutable>;
    static listCommentsForApi(parameters: {
        start: number;
        count: number;
        sort: string;
        autoTagOfAccountId: number;
        videoAccountOwnerId?: number;
        videoChannelOwnerId?: number;
        onLocalVideo?: boolean;
        isLocal?: boolean;
        search?: string;
        searchAccount?: string;
        searchVideo?: string;
        heldForReview: boolean;
        videoId?: number;
        videoChannelId?: number;
        autoTagOneOf?: string[];
    }): Promise<{
        total: any;
        data: MCommentAdminOrUserFormattable[];
    }>;
    static listThreadsForApi(parameters: {
        video: MVideo;
        start: number;
        count: number;
        sort: string;
        user?: MUserAccountId;
    }): Promise<{
        total: any;
        data: MCommentAdminOrUserFormattable[];
        totalNotDeletedComments: any;
    }>;
    static listThreadCommentsForApi(parameters: {
        video: MVideo;
        threadId: number;
        user?: MUserAccountId;
    }): Promise<{
        total: any;
        data: MCommentAdminOrUserFormattable[];
    }>;
    static listThreadParentComments(options: {
        comment: MCommentId;
        transaction?: Transaction;
        order?: 'ASC' | 'DESC';
    }): Promise<MCommentOwner[]>;
    static listAndCountByVideoForAP(parameters: {
        video: MVideoImmutable;
        start: number;
        count: number;
    }): Promise<{
        total: any;
        data: MComment[];
    }>;
    static listForFeed(parameters: {
        start: number;
        count: number;
        videoId?: number;
        videoAccountOwnerId?: number;
        videoChannelOwnerId?: number;
    }): Promise<MCommentOwnerVideoFeed[]>;
    static listForBulkDelete(ofAccount: MAccount, filter?: {
        onVideosOfAccount?: MAccountId;
    }): Promise<MComment[]>;
    static listForExport(ofAccountId: number): Promise<MCommentExport[]>;
    static getStats(): Promise<{
        totalLocalVideoComments: number;
        totalVideoComments: number;
    }>;
    static listRemoteCommentUrlsOfLocalVideos(): Promise<string[]>;
    static cleanOldCommentsOf(videoId: number, beforeUpdatedAt: Date): Promise<number>;
    getCommentStaticPath(): string;
    getCommentUserReviewPath(): string;
    getThreadId(): number;
    isOwned(): boolean;
    markAsDeleted(): void;
    isDeleted(): boolean;
    extractMentions(): string[];
    toFormattedJSON(this: MCommentFormattable): VideoComment;
    toFormattedForAdminOrUserJSON(this: MCommentAdminOrUserFormattable): VideoCommentForAdminOrUser;
    toActivityPubObject(this: MCommentAP, threadParentComments: MCommentOwner[]): VideoCommentObject | ActivityTombstoneObject;
    private static buildBlockerAccountIds;
    private static buildBlockerAccountIdsAndCanSeeHeldForReview;
}
//# sourceMappingURL=video-comment.d.ts.map