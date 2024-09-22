import { AccountBlock, BlockStatus, ResultList, ServerBlock } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
type ListBlocklistOptions = OverrideCommandOptions & {
    start: number;
    count: number;
    sort?: string;
    search?: string;
};
export declare class BlocklistCommand extends AbstractCommand {
    listMyAccountBlocklist(options: ListBlocklistOptions): Promise<ResultList<AccountBlock>>;
    listMyServerBlocklist(options: ListBlocklistOptions): Promise<ResultList<ServerBlock>>;
    listServerAccountBlocklist(options: ListBlocklistOptions): Promise<ResultList<AccountBlock>>;
    listServerServerBlocklist(options: ListBlocklistOptions): Promise<ResultList<ServerBlock>>;
    getStatus(options: OverrideCommandOptions & {
        accounts?: string[];
        hosts?: string[];
    }): Promise<BlockStatus>;
    addToMyBlocklist(options: OverrideCommandOptions & {
        account?: string;
        server?: string;
    }): import("supertest").Test;
    addToServerBlocklist(options: OverrideCommandOptions & {
        account?: string;
        server?: string;
    }): import("supertest").Test;
    removeFromMyBlocklist(options: OverrideCommandOptions & {
        account?: string;
        server?: string;
    }): import("supertest").Test;
    removeFromServerBlocklist(options: OverrideCommandOptions & {
        account?: string;
        server?: string;
    }): import("supertest").Test;
    private listBlocklist;
}
export {};
//# sourceMappingURL=blocklist-command.d.ts.map