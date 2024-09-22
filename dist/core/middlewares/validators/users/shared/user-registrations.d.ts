import express from 'express';
import { MRegistration } from '../../../../types/models/index.js';
declare function checkRegistrationIdExist(idArg: number | string, res: express.Response): Promise<boolean>;
declare function checkRegistrationEmailExist(email: string, res: express.Response, abortResponse?: boolean): Promise<boolean>;
declare function checkRegistrationHandlesDoNotAlreadyExist(options: {
    username: string;
    channelHandle: string;
    email: string;
    res: express.Response;
}): Promise<boolean>;
declare function checkRegistrationExist(finder: () => Promise<MRegistration>, res: express.Response, abortResponse?: boolean): Promise<boolean>;
export { checkRegistrationIdExist, checkRegistrationEmailExist, checkRegistrationHandlesDoNotAlreadyExist, checkRegistrationExist };
//# sourceMappingURL=user-registrations.d.ts.map