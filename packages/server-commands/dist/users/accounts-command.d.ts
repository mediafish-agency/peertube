import { Account, AccountVideoRate, ActorFollow, ResultList, VideoRateType } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class AccountsCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        sort?: string;
    }): Promise<ResultList<Account>>;
    get(options: OverrideCommandOptions & {
        accountName: string;
    }): Promise<Account>;
    listRatings(options: OverrideCommandOptions & {
        accountName: string;
        rating?: VideoRateType;
    }): Promise<ResultList<AccountVideoRate>>;
    listFollowers(options: OverrideCommandOptions & {
        accountName: string;
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
    }): Promise<ResultList<ActorFollow>>;
}
//# sourceMappingURL=accounts-command.d.ts.map