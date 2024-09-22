import express, { VideoLegacyUploadFile } from 'express';
import { PathLike } from 'fs-extra/esm';
import { Transaction } from 'sequelize';
import { AbuseModel } from '../models/abuse/abuse.js';
import { VideoFileModel } from '../models/video/video-file.js';
import { FilteredModelAttributes } from '../types/index.js';
import { MAbuseFull, MAccountDefault, MAccountLight, MComment, MCommentOwnerVideo, MUser, MUserDefault, MVideoAccountLightBlacklistAllFiles } from '../types/models/index.js';
import { LiveVideoCreate, VideoCommentCreate, VideoCreate, VideoImportCreate } from '@peertube/peertube-models';
import { UserModel } from '../models/user/user.js';
import { VideoCommentModel } from '../models/video/video-comment.js';
import { VideoModel } from '../models/video/video.js';
export type AcceptResult = {
    accepted: boolean;
    errorMessage?: string;
};
declare function isLocalVideoFileAccepted(object: {
    videoBody: VideoCreate;
    videoFile: VideoLegacyUploadFile;
    user: MUserDefault;
}): AcceptResult;
declare function isLocalLiveVideoAccepted(object: {
    liveVideoBody: LiveVideoCreate;
    user: UserModel;
}): AcceptResult;
declare function isLocalVideoThreadAccepted(_object: {
    req: express.Request;
    commentBody: VideoCommentCreate;
    video: VideoModel;
    user: UserModel;
}): AcceptResult;
declare function isLocalVideoCommentReplyAccepted(_object: {
    req: express.Request;
    commentBody: VideoCommentCreate;
    parentComment: VideoCommentModel;
    video: VideoModel;
    user: UserModel;
}): AcceptResult;
declare function isRemoteVideoCommentAccepted(_object: {
    comment: MComment;
}): AcceptResult;
declare function isPreImportVideoAccepted(object: {
    videoImportBody: VideoImportCreate;
    user: MUser;
}): AcceptResult;
declare function isPostImportVideoAccepted(object: {
    videoFilePath: PathLike;
    videoFile: VideoFileModel;
    user: MUser;
}): AcceptResult;
declare function createVideoAbuse(options: {
    baseAbuse: FilteredModelAttributes<AbuseModel>;
    videoInstance: MVideoAccountLightBlacklistAllFiles;
    startAt: number;
    endAt: number;
    transaction: Transaction;
    reporterAccount: MAccountDefault;
    skipNotification: boolean;
}): Promise<import("@peertube/peertube-models").AdminAbuse>;
declare function createVideoCommentAbuse(options: {
    baseAbuse: FilteredModelAttributes<AbuseModel>;
    commentInstance: MCommentOwnerVideo;
    transaction: Transaction;
    reporterAccount: MAccountDefault;
    skipNotification: boolean;
}): Promise<import("@peertube/peertube-models").AdminAbuse>;
declare function createAccountAbuse(options: {
    baseAbuse: FilteredModelAttributes<AbuseModel>;
    accountInstance: MAccountDefault;
    transaction: Transaction;
    reporterAccount: MAccountDefault;
    skipNotification: boolean;
}): Promise<import("@peertube/peertube-models").AdminAbuse>;
export { isLocalLiveVideoAccepted, isLocalVideoFileAccepted, isLocalVideoThreadAccepted, isRemoteVideoCommentAccepted, isLocalVideoCommentReplyAccepted, isPreImportVideoAccepted, isPostImportVideoAccepted, createAbuse, createVideoAbuse, createVideoCommentAbuse, createAccountAbuse };
declare function createAbuse(options: {
    base: FilteredModelAttributes<AbuseModel>;
    reporterAccount: MAccountDefault;
    flaggedAccount: MAccountLight;
    associateFun: (abuseInstance: MAbuseFull) => Promise<{
        isOwned: boolean;
    }>;
    skipNotification: boolean;
    transaction: Transaction;
}): Promise<import("@peertube/peertube-models").AdminAbuse>;
//# sourceMappingURL=moderation.d.ts.map