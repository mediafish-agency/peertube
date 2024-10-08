import { AccountModel } from '../../../models/account/account.js';
import { UserModel } from '../../../models/user/user.js';
import { forceNumber } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
function doesAccountIdExist(id, res, sendNotFound = true) {
    const promise = AccountModel.load(forceNumber(id));
    return doesAccountExist(promise, res, sendNotFound);
}
function doesLocalAccountNameExist(name, res, sendNotFound = true) {
    const promise = AccountModel.loadLocalByName(name);
    return doesAccountExist(promise, res, sendNotFound);
}
function doesAccountNameWithHostExist(nameWithDomain, res, sendNotFound = true) {
    const promise = AccountModel.loadByNameWithHost(nameWithDomain);
    return doesAccountExist(promise, res, sendNotFound);
}
async function doesAccountExist(p, res, sendNotFound) {
    const account = await p;
    if (!account) {
        if (sendNotFound === true) {
            res.fail({
                status: HttpStatusCode.NOT_FOUND_404,
                message: 'Account not found'
            });
        }
        return false;
    }
    res.locals.account = account;
    return true;
}
async function doesUserFeedTokenCorrespond(id, token, res) {
    const user = await UserModel.loadByIdWithChannels(forceNumber(id));
    if (token !== user.feedToken) {
        res.fail({
            status: HttpStatusCode.FORBIDDEN_403,
            message: 'User and token mismatch'
        });
        return false;
    }
    res.locals.user = user;
    return true;
}
export { doesAccountIdExist, doesLocalAccountNameExist, doesAccountNameWithHostExist, doesAccountExist, doesUserFeedTokenCorrespond };
//# sourceMappingURL=accounts.js.map