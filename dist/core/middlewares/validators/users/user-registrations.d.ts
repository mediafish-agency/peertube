import express from 'express';
import { ValidationChain } from 'express-validator';
import { SignupMode } from '../../../lib/signup.js';
declare const usersDirectRegistrationValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const usersRequestRegistrationValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare function ensureUserRegistrationAllowedFactory(signupMode: SignupMode): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
declare const ensureUserRegistrationAllowedForIP: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
declare const acceptOrRejectRegistrationValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const getRegistrationValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const listRegistrationsValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export { usersDirectRegistrationValidator, usersRequestRegistrationValidator, ensureUserRegistrationAllowedFactory, ensureUserRegistrationAllowedForIP, getRegistrationValidator, listRegistrationsValidator, acceptOrRejectRegistrationValidator };
//# sourceMappingURL=user-registrations.d.ts.map