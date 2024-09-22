import { AccountBlock } from '@peertube/peertube-models';
import { MAccountBlocklist, MAccountBlocklistFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { AccountModel } from './account.js';
export declare class AccountBlocklistModel extends SequelizeModel<AccountBlocklistModel> {
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    ByAccount: Awaited<AccountModel>;
    targetAccountId: number;
    BlockedAccount: Awaited<AccountModel>;
    static isAccountMutedByAccounts(accountIds: number[], targetAccountId: number): Promise<{
        [accountId: number]: boolean;
    }>;
    static loadByAccountAndTarget(accountId: number, targetAccountId: number): Promise<MAccountBlocklist>;
    static listForApi(parameters: {
        start: number;
        count: number;
        sort: string;
        search?: string;
        accountId: number;
    }): Promise<{
        total: number;
        data: AccountBlocklistModel[];
    }>;
    static listHandlesBlockedBy(accountIds: number[]): Promise<string[]>;
    static getBlockStatus(byAccountIds: number[], handles: string[]): Promise<{
        name: string;
        host: string;
        accountId: number;
    }[]>;
    toFormattedJSON(this: MAccountBlocklistFormattable): AccountBlock;
}
//# sourceMappingURL=account-blocklist.d.ts.map