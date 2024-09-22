import { Awaitable } from '@peertube/peertube-typescript-utils';
import { MAccountId } from '../../types/models/index.js';
import express from 'express';
import { ValidationChain } from 'express-validator';
export declare const manageAccountWatchedWordsListValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare function getWatchedWordsListValidatorFactory(accountGetter: (res: express.Response) => Awaitable<MAccountId>): (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare function addWatchedWordsListValidatorFactory(accountGetter: (res: express.Response) => Awaitable<MAccountId>): (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare function updateWatchedWordsListValidatorFactory(accountGetter: (res: express.Response) => Awaitable<MAccountId>): (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
//# sourceMappingURL=watched-words.d.ts.map