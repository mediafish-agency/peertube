import { AccountModel } from '../../../models/account/account.js';
import { UserModel } from '../../../models/user/user.js';
import { MVideoPlaylist } from '../index.js';
import { PickWith, PickWithOpt } from '@peertube/peertube-typescript-utils';
import { MAccount, MAccountDefault, MAccountDefaultChannelDefault, MAccountFormattable, MAccountId, MAccountIdActorId, MAccountUrl } from '../account/index.js';
import { MChannelFormattable } from '../video/video-channel.js';
import { MNotificationSetting, MNotificationSettingFormattable } from './user-notification-setting.js';
type Use<K extends keyof UserModel, M> = PickWith<UserModel, K, M>;
export type MUser = Omit<UserModel, 'Account' | 'NotificationSetting' | 'VideoImports' | 'OAuthTokens'>;
export type MUserQuotaUsed = MUser & {
    videoQuotaUsed?: number;
    videoQuotaUsedDaily?: number;
};
export type MUserId = Pick<UserModel, 'id'>;
export type MUserAccountId = MUser & Use<'Account', MAccountId>;
export type MUserAccountUrl = MUser & Use<'Account', MAccountUrl & MAccountIdActorId>;
export type MUserAccount = MUser & Use<'Account', MAccount>;
export type MUserAccountDefault = MUser & Use<'Account', MAccountDefault>;
export type MUserNotifSettingChannelDefault = MUser & Use<'NotificationSetting', MNotificationSetting> & Use<'Account', MAccountDefaultChannelDefault>;
export type MUserWithNotificationSetting = MUser & Use<'NotificationSetting', MNotificationSetting>;
export type MUserNotifSettingAccount = MUser & Use<'NotificationSetting', MNotificationSetting> & Use<'Account', MAccount>;
export type MUserDefault = MUser & Use<'NotificationSetting', MNotificationSetting> & Use<'Account', MAccountDefault>;
type MAccountWithChannels = MAccountFormattable & PickWithOpt<AccountModel, 'VideoChannels', MChannelFormattable[]>;
type MAccountWithChannelsAndSpecialPlaylists = MAccountWithChannels & PickWithOpt<AccountModel, 'VideoPlaylists', MVideoPlaylist[]>;
export type MUserFormattable = MUserQuotaUsed & Use<'Account', MAccountWithChannels> & PickWithOpt<UserModel, 'NotificationSetting', MNotificationSettingFormattable>;
export type MMyUserFormattable = MUserFormattable & Use<'Account', MAccountWithChannelsAndSpecialPlaylists>;
export {};
//# sourceMappingURL=user.d.ts.map