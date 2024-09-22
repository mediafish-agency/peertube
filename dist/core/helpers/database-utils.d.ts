import Bluebird from 'bluebird';
import { Transaction } from 'sequelize';
import { Model } from 'sequelize-typescript';
declare function retryTransactionWrapper<T, A, B, C, D>(functionToRetry: (arg1: A, arg2: B, arg3: C, arg4: D) => Promise<T>, arg1: A, arg2: B, arg3: C, arg4: D): Promise<T>;
declare function retryTransactionWrapper<T, A, B, C>(functionToRetry: (arg1: A, arg2: B, arg3: C) => Promise<T>, arg1: A, arg2: B, arg3: C): Promise<T>;
declare function retryTransactionWrapper<T, A, B>(functionToRetry: (arg1: A, arg2: B) => Promise<T>, arg1: A, arg2: B): Promise<T>;
declare function retryTransactionWrapper<T, A>(functionToRetry: (arg1: A) => Promise<T>, arg1: A): Promise<T>;
declare function retryTransactionWrapper<T>(functionToRetry: () => Promise<T> | Bluebird<T>): Promise<T>;
declare function transactionRetryer<T>(func: (err: any, data: T) => any): Promise<T>;
declare function saveInTransactionWithRetries<T extends Pick<Model, 'save' | 'changed'>>(model: T): Promise<void>;
declare function resetSequelizeInstance<T>(instance: Model<T>): Promise<Model<T, T>>;
declare function filterNonExistingModels<T extends {
    hasSameUniqueKeysThan(other: T): boolean;
}>(fromDatabase: T[], newModels: T[]): T[];
declare function deleteAllModels<T extends Pick<Model, 'destroy'>>(models: T[], transaction: Transaction): Promise<void[]>;
declare function runInReadCommittedTransaction<T>(fn: (t: Transaction) => Promise<T>): Promise<T>;
declare function afterCommitIfTransaction(t: Transaction, fn: Function): any;
export { resetSequelizeInstance, retryTransactionWrapper, transactionRetryer, saveInTransactionWithRetries, afterCommitIfTransaction, filterNonExistingModels, deleteAllModels, runInReadCommittedTransaction };
//# sourceMappingURL=database-utils.d.ts.map