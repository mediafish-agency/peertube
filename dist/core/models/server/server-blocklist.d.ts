import { MServerBlocklist, MServerBlocklistAccountServer, MServerBlocklistFormattable } from '../../types/models/index.js';
import { ServerBlock } from '@peertube/peertube-models';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { ServerModel } from './server.js';
export declare class ServerBlocklistModel extends SequelizeModel<ServerBlocklistModel> {
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    ByAccount: Awaited<AccountModel>;
    targetServerId: number;
    BlockedServer: Awaited<ServerModel>;
    static isServerMutedByAccounts(accountIds: number[], targetServerId: number): Promise<{
        [accountId: number]: boolean;
    }>;
    static loadByAccountAndHost(accountId: number, host: string): Promise<MServerBlocklist>;
    static listHostsBlockedBy(accountIds: number[]): Promise<string[]>;
    static getBlockStatus(byAccountIds: number[], hosts: string[]): Promise<{
        host: string;
        accountId: number;
    }[]>;
    static listForApi(parameters: {
        start: number;
        count: number;
        sort: string;
        search?: string;
        accountId: number;
    }): Promise<{
        total: number;
        data: MServerBlocklistAccountServer[];
    }>;
    toFormattedJSON(this: MServerBlocklistFormattable): ServerBlock;
}
//# sourceMappingURL=server-blocklist.d.ts.map