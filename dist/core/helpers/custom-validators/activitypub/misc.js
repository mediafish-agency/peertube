import validator from 'validator';
import { CONFIG } from '../../../initializers/config.js';
import { CONSTRAINTS_FIELDS } from '../../../initializers/constants.js';
import { exists } from '../misc.js';
function isUrlValid(url) {
    const isURLOptions = {
        require_host: true,
        require_tld: true,
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['http', 'https']
    };
    if (CONFIG.WEBSERVER.HOSTNAME === 'localhost' || CONFIG.WEBSERVER.HOSTNAME === '127.0.0.1') {
        isURLOptions.require_tld = false;
    }
    return exists(url) && validator.default.isURL('' + url, isURLOptions);
}
function isActivityPubUrlValid(url) {
    return isUrlValid(url) && validator.default.isLength('' + url, CONSTRAINTS_FIELDS.ACTORS.URL);
}
function isBaseActivityValid(activity, type) {
    return activity.type === type &&
        isActivityPubUrlValid(activity.id) &&
        isObjectValid(activity.actor) &&
        isUrlCollectionValid(activity.to) &&
        isUrlCollectionValid(activity.cc);
}
function isUrlCollectionValid(collection) {
    return collection === undefined ||
        (Array.isArray(collection) && collection.every(t => isActivityPubUrlValid(t)));
}
function isObjectValid(object) {
    return exists(object) &&
        (isActivityPubUrlValid(object) || isActivityPubUrlValid(object.id));
}
function setValidAttributedTo(obj) {
    if (Array.isArray(obj.attributedTo) === false) {
        obj.attributedTo = [];
        return true;
    }
    obj.attributedTo = obj.attributedTo.filter(a => {
        return isActivityPubUrlValid(a) ||
            ((a.type === 'Group' || a.type === 'Person') && isActivityPubUrlValid(a.id));
    });
    return true;
}
function isActivityPubVideoDurationValid(value) {
    return exists(value) &&
        typeof value === 'string' &&
        value.startsWith('PT') &&
        value.endsWith('S');
}
export { isUrlValid, isActivityPubUrlValid, isBaseActivityValid, setValidAttributedTo, isObjectValid, isActivityPubVideoDurationValid };
//# sourceMappingURL=misc.js.map