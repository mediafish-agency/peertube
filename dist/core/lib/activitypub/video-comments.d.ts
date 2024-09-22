import { MCommentOwner, MCommentOwnerVideo, MVideoAccountLightBlacklistAllFiles } from '../../types/models/video/index.js';
type ResolveThreadParams = {
    url: string;
    comments?: MCommentOwner[];
    isVideo?: boolean;
    commentCreated?: boolean;
};
type ResolveThreadResult = Promise<{
    video: MVideoAccountLightBlacklistAllFiles;
    comment: MCommentOwnerVideo;
    commentCreated: boolean;
}>;
export declare function addVideoComments(commentUrls: string[]): Promise<void[]>;
export declare function resolveThread(params: ResolveThreadParams): ResolveThreadResult;
export {};
//# sourceMappingURL=video-comments.d.ts.map