import { WatchedWordsList } from '@peertube/peertube-models';
import { MAccountId } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
export declare class WatchedWordsListModel extends SequelizeModel<WatchedWordsListModel> {
    createdAt: Date;
    updatedAt: Date;
    listName: string;
    words: string[];
    accountId: number;
    Account: Awaited<AccountModel>;
    private static readonly regexCache;
    static load(options: {
        id: number;
        accountId: number;
    }): Promise<WatchedWordsListModel>;
    static loadByListName(options: {
        listName: string;
        accountId: number;
    }): Promise<WatchedWordsListModel>;
    static listNamesOf(account: MAccountId): Promise<string[]>;
    static listForAPI(options: {
        accountId: number;
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: WatchedWordsListModel[];
    }>;
    static listForExport(options: {
        accountId: number;
    }): Promise<WatchedWordsListModel[]>;
    static buildWatchedWordsRegexp(options: {
        accountId: number;
        transaction: Transaction;
    }): Promise<{
        listName: string;
        regex: RegExp;
    }[]>;
    static createList(options: {
        accountId: number;
        listName: string;
        words: string[];
    }): Promise<SequelizeModel<unknown>>;
    updateList(options: {
        listName: string;
        words?: string[];
    }): Promise<this>;
    destroy(): Promise<void>;
    toFormattedJSON(): WatchedWordsList;
}
//# sourceMappingURL=watched-words-list.d.ts.map