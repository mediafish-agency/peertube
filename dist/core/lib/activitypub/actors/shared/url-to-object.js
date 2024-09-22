import { sanitizeAndCheckActorObject } from '../../../../helpers/custom-validators/activitypub/actor.js';
import { logger } from '../../../../helpers/logger.js';
import { fetchAP } from '../../activity.js';
import { checkUrlsSameHost } from '../../url.js';
async function fetchRemoteActor(actorUrl) {
    logger.info('Fetching remote actor %s.', actorUrl);
    const { body, statusCode } = await fetchAP(actorUrl);
    if (sanitizeAndCheckActorObject(body) === false) {
        logger.debug('Remote actor JSON is not valid.', { actorJSON: body });
        return { actorObject: undefined, statusCode };
    }
    if (checkUrlsSameHost(body.id, actorUrl) !== true) {
        logger.warn('Actor url %s has not the same host than its AP id %s', actorUrl, body.id);
        return { actorObject: undefined, statusCode };
    }
    return {
        statusCode,
        actorObject: body
    };
}
async function fetchActorFollowsCount(actorObject) {
    let followersCount = 0;
    let followingCount = 0;
    if (actorObject.followers)
        followersCount = await fetchActorTotalItems(actorObject.followers);
    if (actorObject.following)
        followingCount = await fetchActorTotalItems(actorObject.following);
    return { followersCount, followingCount };
}
export { fetchActorFollowsCount, fetchRemoteActor };
async function fetchActorTotalItems(url) {
    try {
        const { body } = await fetchAP(url);
        return body.totalItems || 0;
    }
    catch (err) {
        logger.info('Cannot fetch remote actor count %s.', url, { err });
        return 0;
    }
}
//# sourceMappingURL=url-to-object.js.map