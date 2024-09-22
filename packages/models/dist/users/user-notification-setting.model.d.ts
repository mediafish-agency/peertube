export declare const UserNotificationSettingValue: {
    readonly NONE: 0;
    readonly WEB: number;
    readonly EMAIL: number;
};
export type UserNotificationSettingValueType = typeof UserNotificationSettingValue[keyof typeof UserNotificationSettingValue];
export interface UserNotificationSetting {
    abuseAsModerator: UserNotificationSettingValueType;
    videoAutoBlacklistAsModerator: UserNotificationSettingValueType;
    newUserRegistration: UserNotificationSettingValueType;
    newVideoFromSubscription: UserNotificationSettingValueType;
    blacklistOnMyVideo: UserNotificationSettingValueType;
    myVideoPublished: UserNotificationSettingValueType;
    myVideoImportFinished: UserNotificationSettingValueType;
    commentMention: UserNotificationSettingValueType;
    newCommentOnMyVideo: UserNotificationSettingValueType;
    newFollow: UserNotificationSettingValueType;
    newInstanceFollower: UserNotificationSettingValueType;
    autoInstanceFollowing: UserNotificationSettingValueType;
    abuseStateChange: UserNotificationSettingValueType;
    abuseNewMessage: UserNotificationSettingValueType;
    newPeerTubeVersion: UserNotificationSettingValueType;
    newPluginVersion: UserNotificationSettingValueType;
    myVideoStudioEditionFinished: UserNotificationSettingValueType;
    myVideoTranscriptionGenerated: UserNotificationSettingValueType;
}
//# sourceMappingURL=user-notification-setting.model.d.ts.map