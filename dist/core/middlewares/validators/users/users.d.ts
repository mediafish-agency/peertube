import express from 'express';
export declare const usersListValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export declare const usersAddValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersRemoveValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersBlockingValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const deleteMeValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const usersUpdateValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersUpdateMeValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersGetValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersVideoRatingValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersVideosValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersAskResetPasswordValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any>>))[];
export declare const usersResetPasswordValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const usersCheckCurrentPasswordFactory: (targetUserIdGetter: (req: express.Request) => number | string) => (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare const userAutocompleteValidator: import("express-validator").ValidationChain[];
export declare const ensureAuthUserOwnsAccountValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const ensureCanManageChannelOrAccount: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const ensureCanModerateUser: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
//# sourceMappingURL=users.d.ts.map