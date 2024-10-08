import { body, param, query } from 'express-validator';
import { arrayify } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { areValidActorHandles, isValidActorHandle } from '../../../helpers/custom-validators/activitypub/actor.js';
import { WEBSERVER } from '../../../initializers/constants.js';
import { ActorFollowModel } from '../../../models/actor/actor-follow.js';
import { areValidationErrors } from '../shared/index.js';
const userSubscriptionListValidator = [
    query('search')
        .optional()
        .not().isEmpty(),
    (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        return next();
    }
];
const userSubscriptionAddValidator = [
    body('uri')
        .custom(isValidActorHandle).withMessage('Should have a valid URI to follow (username@domain)'),
    (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        return next();
    }
];
const areSubscriptionsExistValidator = [
    query('uris')
        .customSanitizer(arrayify)
        .custom(areValidActorHandles).withMessage('Should have a valid array of URIs'),
    (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        return next();
    }
];
const userSubscriptionGetValidator = [
    param('uri')
        .custom(isValidActorHandle),
    async (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        if (!await doesSubscriptionExist({ uri: req.params.uri, res, state: 'accepted' }))
            return;
        return next();
    }
];
const userSubscriptionDeleteValidator = [
    param('uri')
        .custom(isValidActorHandle),
    async (req, res, next) => {
        if (areValidationErrors(req, res))
            return;
        if (!await doesSubscriptionExist({ uri: req.params.uri, res }))
            return;
        return next();
    }
];
export { areSubscriptionsExistValidator, userSubscriptionListValidator, userSubscriptionAddValidator, userSubscriptionGetValidator, userSubscriptionDeleteValidator };
async function doesSubscriptionExist(options) {
    const { uri, res, state } = options;
    let [name, host] = uri.split('@');
    if (host === WEBSERVER.HOST)
        host = null;
    const user = res.locals.oauth.token.User;
    const subscription = await ActorFollowModel.loadByActorAndTargetNameAndHostForAPI({
        actorId: user.Account.Actor.id,
        targetName: name,
        targetHost: host,
        state
    });
    if (!(subscription === null || subscription === void 0 ? void 0 : subscription.ActorFollowing.VideoChannel)) {
        res.fail({
            status: HttpStatusCode.NOT_FOUND_404,
            message: `Subscription ${uri} not found.`
        });
        return false;
    }
    res.locals.subscription = subscription;
    return true;
}
//# sourceMappingURL=user-subscriptions.js.map