import { UserRightType } from '@peertube/peertube-models';
import { MAccountId, MUserAccountId, MUserDefault } from '../../../types/models/index.js';
import express from 'express';
export declare function checkUserIdExist(idArg: number | string, res: express.Response, withStats?: boolean): Promise<boolean>;
export declare function checkUserEmailExist(email: string, res: express.Response, abortResponse?: boolean): Promise<boolean>;
export declare function checkUserNameOrEmailDoNotAlreadyExist(username: string, email: string, res: express.Response): Promise<boolean>;
export declare function checkUserExist(finder: () => Promise<MUserDefault>, res: express.Response, abortResponse?: boolean): Promise<boolean>;
export declare function checkUserCanManageAccount(options: {
    user: MUserAccountId;
    account: MAccountId;
    specialRight: UserRightType;
    res: express.Response;
}): boolean;
//# sourceMappingURL=users.d.ts.map