import { UserRegistrationModel } from '../../../../models/user/user-registration.js';
import { forceNumber, pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
function checkRegistrationIdExist(idArg, res) {
    const id = forceNumber(idArg);
    return checkRegistrationExist(() => UserRegistrationModel.load(id), res);
}
function checkRegistrationEmailExist(email, res, abortResponse = true) {
    return checkRegistrationExist(() => UserRegistrationModel.loadByEmail(email), res, abortResponse);
}
async function checkRegistrationHandlesDoNotAlreadyExist(options) {
    const { res } = options;
    const registration = await UserRegistrationModel.loadByEmailOrHandle(pick(options, ['username', 'email', 'channelHandle']));
    if (registration) {
        res.fail({
            status: HttpStatusCode.CONFLICT_409,
            message: 'Registration with this username, channel name or email already exists.'
        });
        return false;
    }
    return true;
}
async function checkRegistrationExist(finder, res, abortResponse = true) {
    const registration = await finder();
    if (!registration) {
        if (abortResponse === true) {
            res.fail({
                status: HttpStatusCode.NOT_FOUND_404,
                message: 'User not found'
            });
        }
        return false;
    }
    res.locals.userRegistration = registration;
    return true;
}
export { checkRegistrationIdExist, checkRegistrationEmailExist, checkRegistrationHandlesDoNotAlreadyExist, checkRegistrationExist };
//# sourceMappingURL=user-registrations.js.map