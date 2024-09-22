import { type UserNotificationSetting, type UserNotificationSettingValueType } from '@peertube/peertube-models';
import { MNotificationSettingFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { UserModel } from './user.js';
export declare class UserNotificationSettingModel extends SequelizeModel<UserNotificationSettingModel> {
    newVideoFromSubscription: UserNotificationSettingValueType;
    newCommentOnMyVideo: UserNotificationSettingValueType;
    abuseAsModerator: UserNotificationSettingValueType;
    videoAutoBlacklistAsModerator: UserNotificationSettingValueType;
    blacklistOnMyVideo: UserNotificationSettingValueType;
    myVideoPublished: UserNotificationSettingValueType;
    myVideoImportFinished: UserNotificationSettingValueType;
    newUserRegistration: UserNotificationSettingValueType;
    newInstanceFollower: UserNotificationSettingValueType;
    autoInstanceFollowing: UserNotificationSettingValueType;
    newFollow: UserNotificationSettingValueType;
    commentMention: UserNotificationSettingValueType;
    abuseStateChange: UserNotificationSettingValueType;
    abuseNewMessage: UserNotificationSettingValueType;
    newPeerTubeVersion: UserNotificationSettingValueType;
    newPluginVersion: UserNotificationSettingValueType;
    myVideoStudioEditionFinished: UserNotificationSettingValueType;
    myVideoTranscriptionGenerated: UserNotificationSettingValueType;
    userId: number;
    User: Awaited<UserModel>;
    createdAt: Date;
    updatedAt: Date;
    static removeTokenCache(instance: UserNotificationSettingModel): void;
    static updateUserSettings(settings: UserNotificationSetting, userId: number): Promise<[affectedCount: number]>;
    toFormattedJSON(this: MNotificationSettingFormattable): UserNotificationSetting;
}
//# sourceMappingURL=user-notification-setting.d.ts.map