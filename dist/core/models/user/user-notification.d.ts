import { UserNotification, type UserNotificationType_Type } from '@peertube/peertube-models';
import { UserNotificationIncludes, UserNotificationModelForApi } from '../../types/models/user/index.js';
import { AbuseModel } from '../abuse/abuse.js';
import { AccountModel } from '../account/account.js';
import { ActorFollowModel } from '../actor/actor-follow.js';
import { ApplicationModel } from '../application/application.js';
import { PluginModel } from '../server/plugin.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoBlacklistModel } from '../video/video-blacklist.js';
import { VideoCaptionModel } from '../video/video-caption.js';
import { VideoCommentModel } from '../video/video-comment.js';
import { VideoImportModel } from '../video/video-import.js';
import { VideoModel } from '../video/video.js';
import { UserRegistrationModel } from './user-registration.js';
import { UserModel } from './user.js';
export declare class UserNotificationModel extends SequelizeModel<UserNotificationModel> {
    type: UserNotificationType_Type;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    User: Awaited<UserModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
    commentId: number;
    VideoComment: Awaited<VideoCommentModel>;
    abuseId: number;
    Abuse: Awaited<AbuseModel>;
    videoBlacklistId: number;
    VideoBlacklist: Awaited<VideoBlacklistModel>;
    videoImportId: number;
    VideoImport: Awaited<VideoImportModel>;
    accountId: number;
    Account: Awaited<AccountModel>;
    actorFollowId: number;
    ActorFollow: Awaited<ActorFollowModel>;
    pluginId: number;
    Plugin: Awaited<PluginModel>;
    applicationId: number;
    Application: Awaited<ApplicationModel>;
    userRegistrationId: number;
    UserRegistration: Awaited<UserRegistrationModel>;
    videoCaptionId: number;
    VideoCaption: Awaited<VideoCaptionModel>;
    static listForApi(userId: number, start: number, count: number, sort: string, unread?: boolean): Promise<{
        total: number;
        data: UserNotificationModelForApi[];
    }>;
    static markAsRead(userId: number, notificationIds: number[]): Promise<[affectedCount: number]>;
    static markAllAsRead(userId: number): Promise<[affectedCount: number]>;
    static removeNotificationsOf(options: {
        id: number;
        type: 'account' | 'server';
        forUserId?: number;
    }): Promise<[unknown[], unknown]>;
    toFormattedJSON(this: UserNotificationModelForApi): UserNotification;
    formatVideo(video: UserNotificationIncludes.VideoInclude): {
        id: number;
        uuid: string;
        shortUUID: string;
        name: string;
    };
    formatAbuse(abuse: UserNotificationIncludes.AbuseInclude): {
        id: number;
        state: import("@peertube/peertube-models").AbuseStateType;
        video: {
            id: number;
            uuid: string;
            shortUUID: string;
            name: string;
        };
        comment: {
            threadId: number;
            video: {
                id: number;
                name: string;
                shortUUID: string;
                uuid: string;
            };
        };
        account: {
            avatar: {
                path: string;
                width: number;
            };
            avatars: {
                path: string;
                width: number;
            }[];
            id: number;
            displayName: string;
            name: string;
            host: string;
        };
    };
    formatActor(accountOrChannel: UserNotificationIncludes.AccountIncludeActor | UserNotificationIncludes.VideoChannelIncludeActor): {
        avatar: {
            path: string;
            width: number;
        };
        avatars: {
            path: string;
            width: number;
        }[];
        id: number;
        displayName: string;
        name: string;
        host: string;
    };
    formatAvatars(avatars: UserNotificationIncludes.ActorImageInclude[]): {
        avatar: {
            path: string;
            width: number;
        };
        avatars: {
            path: string;
            width: number;
        }[];
    };
    formatAvatar(a: UserNotificationIncludes.ActorImageInclude): {
        path: string;
        width: number;
    };
    formatVideoCaption(a: UserNotificationIncludes.ActorImageInclude): {
        path: string;
        width: number;
    };
}
//# sourceMappingURL=user-notification.d.ts.map