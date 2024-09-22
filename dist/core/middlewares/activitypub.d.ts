import { NextFunction, Request, Response } from 'express';
export declare function checkSignature(req: Request, res: Response, next: NextFunction): Promise<void | Response<any>>;
export declare function executeIfActivityPub(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=activitypub.d.ts.map