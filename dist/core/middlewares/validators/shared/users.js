import { forceNumber } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { ActorModel } from '../../../models/actor/actor.js';
import { UserModel } from '../../../models/user/user.js';
export function checkUserIdExist(idArg, res, withStats = false) {
    const id = forceNumber(idArg);
    return checkUserExist(() => UserModel.loadByIdWithChannels(id, withStats), res);
}
export function checkUserEmailExist(email, res, abortResponse = true) {
    return checkUserExist(() => UserModel.loadByEmail(email), res, abortResponse);
}
export async function checkUserNameOrEmailDoNotAlreadyExist(username, email, res) {
    const user = await UserModel.loadByUsernameOrEmail(username, email);
    if (user) {
        res.fail({
            status: HttpStatusCode.CONFLICT_409,
            message: 'User with this username or email already exists.'
        });
        return false;
    }
    const actor = await ActorModel.loadLocalByName(username);
    if (actor) {
        res.fail({
            status: HttpStatusCode.CONFLICT_409,
            message: 'Another actor (account/channel) with this name on this instance already exists or has already existed.'
        });
        return false;
    }
    return true;
}
export async function checkUserExist(finder, res, abortResponse = true) {
    const user = await finder();
    if (!user) {
        if (abortResponse === true) {
            res.fail({
                status: HttpStatusCode.NOT_FOUND_404,
                message: 'User not found'
            });
        }
        return false;
    }
    res.locals.user = user;
    return true;
}
export function checkUserCanManageAccount(options) {
    const { user, account, specialRight, res } = options;
    if (account.id === user.Account.id)
        return true;
    if (specialRight && user.hasRight(specialRight) === true)
        return true;
    if (!specialRight) {
        res.fail({
            status: HttpStatusCode.FORBIDDEN_403,
            message: 'Only the owner of this account can manage this account resource.'
        });
        return false;
    }
    res.fail({
        status: HttpStatusCode.FORBIDDEN_403,
        message: 'Only a user with sufficient right can access this account resource.'
    });
    return false;
}
//# sourceMappingURL=users.js.map