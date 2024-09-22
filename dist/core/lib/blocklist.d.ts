import { MAccountBlocklist, MAccountId, MAccountHost, MServerBlocklist } from '../types/models/index.js';
declare function addAccountInBlocklist(options: {
    byAccountId: number;
    targetAccountId: number;
    removeNotificationOfUserId: number | null;
}): Promise<void>;
declare function addServerInBlocklist(options: {
    byAccountId: number;
    targetServerId: number;
    removeNotificationOfUserId: number | null;
}): Promise<void>;
declare function removeAccountFromBlocklist(accountBlock: MAccountBlocklist): Promise<void>;
declare function removeServerFromBlocklist(serverBlock: MServerBlocklist): Promise<void>;
declare function isBlockedByServerOrAccount(targetAccount: MAccountHost, userAccount?: MAccountId): Promise<boolean>;
export { addAccountInBlocklist, addServerInBlocklist, removeAccountFromBlocklist, removeServerFromBlocklist, isBlockedByServerOrAccount };
//# sourceMappingURL=blocklist.d.ts.map