import { type AutomaticTagPolicyType } from '@peertube/peertube-models';
import { MAccountId } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { AutomaticTagModel } from './automatic-tag.js';
export declare class AccountAutomaticTagPolicyModel extends SequelizeModel<AccountAutomaticTagPolicyModel> {
    createdAt: Date;
    updatedAt: Date;
    policy: AutomaticTagPolicyType;
    accountId: number;
    Account: Awaited<AccountModel>;
    automaticTagId: number;
    AutomaticTag: Awaited<AutomaticTagModel>;
    static listOfAccount(account: MAccountId): Promise<{
        name: string;
        policy: AutomaticTagPolicyType;
    }[]>;
    static deleteOfAccount(options: {
        account: MAccountId;
        policy: AutomaticTagPolicyType;
        transaction?: Transaction;
    }): Promise<number>;
    static hasPolicyOnTags(options: {
        accountId: number;
        tags: string[];
        policy: AutomaticTagPolicyType;
        transaction: Transaction;
    }): Promise<boolean>;
}
//# sourceMappingURL=account-automatic-tag-policy.d.ts.map