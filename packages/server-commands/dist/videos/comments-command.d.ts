import { ResultList, VideoComment, VideoCommentForAdminOrUser, VideoCommentThreads, VideoCommentThreadTree } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
type ListForAdminOrAccountCommonOptions = {
    start?: number;
    count?: number;
    sort?: string;
    search?: string;
    searchAccount?: string;
    searchVideo?: string;
    videoId?: string | number;
    videoChannelId?: string | number;
    autoTagOneOf?: string[];
};
export declare class CommentsCommand extends AbstractCommand {
    private lastVideoId;
    private lastThreadId;
    private lastReplyId;
    listForAdmin(options?: OverrideCommandOptions & ListForAdminOrAccountCommonOptions & {
        isLocal?: boolean;
        onLocalVideo?: boolean;
    }): Promise<ResultList<VideoCommentForAdminOrUser>>;
    listCommentsOnMyVideos(options?: OverrideCommandOptions & ListForAdminOrAccountCommonOptions & {
        isHeldForReview?: boolean;
    }): Promise<ResultList<VideoCommentForAdminOrUser>>;
    private buildListForAdminOrAccountQuery;
    listThreads(options: OverrideCommandOptions & {
        videoId: number | string;
        videoPassword?: string;
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<VideoCommentThreads>;
    getThread(options: OverrideCommandOptions & {
        videoId: number | string;
        threadId: number;
    }): Promise<VideoCommentThreadTree>;
    getThreadOf(options: OverrideCommandOptions & {
        videoId: number | string;
        text: string;
    }): Promise<VideoCommentThreadTree>;
    createThread(options: OverrideCommandOptions & {
        videoId: number | string;
        text: string;
        videoPassword?: string;
    }): Promise<VideoComment>;
    addReply(options: OverrideCommandOptions & {
        videoId: number | string;
        toCommentId: number;
        text: string;
        videoPassword?: string;
    }): Promise<VideoComment>;
    addReplyToLastReply(options: OverrideCommandOptions & {
        text: string;
    }): Promise<VideoComment>;
    addReplyToLastThread(options: OverrideCommandOptions & {
        text: string;
    }): Promise<VideoComment>;
    findCommentId(options: OverrideCommandOptions & {
        videoId: number | string;
        text: string;
    }): Promise<number>;
    delete(options: OverrideCommandOptions & {
        videoId: number | string;
        commentId: number;
    }): import("supertest").Test;
    deleteAllComments(options: OverrideCommandOptions & {
        videoUUID: string;
    }): Promise<void>;
    approve(options: OverrideCommandOptions & {
        videoId: number | string;
        commentId: number;
    }): import("supertest").Test;
}
export {};
//# sourceMappingURL=comments-command.d.ts.map