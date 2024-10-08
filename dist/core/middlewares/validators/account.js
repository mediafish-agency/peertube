import { param } from 'express-validator';
import { isAccountNameValid } from '../../helpers/custom-validators/accounts.js';
import { areValidationErrors, doesAccountNameWithHostExist, doesLocalAccountNameExist } from './shared/index.js';
const localAccountValidator = [
    param('name')
        .custom(isAccountNameValid),
    async (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        if (!await doesLocalAccountNameExist(req.params.name, res))
            return;
        return next();
    }
];
const accountNameWithHostGetValidator = [
    param('accountName')
        .exists(),
    async (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        if (!await doesAccountNameWithHostExist(req.params.accountName, res))
            return;
        return next();
    }
];
export { localAccountValidator, accountNameWithHostGetValidator };
//# sourceMappingURL=account.js.map