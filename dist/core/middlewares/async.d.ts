import { ExpressPromiseHandler } from '../types/express-handler.js';
import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator';
export type RequestPromiseHandler = ValidationChain | ExpressPromiseHandler;
declare function asyncMiddleware(fun: RequestPromiseHandler | RequestPromiseHandler[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare function asyncRetryTransactionMiddleware(fun: (req: Request, res: Response, next: NextFunction) => Promise<any>): (req: Request, res: Response, next: NextFunction) => Promise<any>;
export { asyncMiddleware, asyncRetryTransactionMiddleware };
//# sourceMappingURL=async.d.ts.map