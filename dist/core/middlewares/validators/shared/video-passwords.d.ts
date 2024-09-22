import express from 'express';
declare function isValidVideoPasswordHeader(): import("express-validator").ValidationChain;
declare function checkVideoIsPasswordProtected(res: express.Response): boolean;
declare function doesVideoPasswordExist(idArg: number | string, res: express.Response): Promise<boolean>;
declare function isVideoPasswordDeletable(res: express.Response): Promise<boolean>;
export { isValidVideoPasswordHeader, checkVideoIsPasswordProtected as isVideoPasswordProtected, doesVideoPasswordExist, isVideoPasswordDeletable };
//# sourceMappingURL=video-passwords.d.ts.map