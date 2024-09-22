import { Response } from 'express';
import { MAccountDefault } from '../../../types/models/index.js';
declare function doesAccountIdExist(id: number | string, res: Response, sendNotFound?: boolean): Promise<boolean>;
declare function doesLocalAccountNameExist(name: string, res: Response, sendNotFound?: boolean): Promise<boolean>;
declare function doesAccountNameWithHostExist(nameWithDomain: string, res: Response, sendNotFound?: boolean): Promise<boolean>;
declare function doesAccountExist(p: Promise<MAccountDefault>, res: Response, sendNotFound: boolean): Promise<boolean>;
declare function doesUserFeedTokenCorrespond(id: number, token: string, res: Response): Promise<boolean>;
export { doesAccountIdExist, doesLocalAccountNameExist, doesAccountNameWithHostExist, doesAccountExist, doesUserFeedTokenCorrespond };
//# sourceMappingURL=accounts.d.ts.map