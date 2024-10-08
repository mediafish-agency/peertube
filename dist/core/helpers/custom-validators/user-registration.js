import validator from 'validator';
import { CONSTRAINTS_FIELDS, USER_REGISTRATION_STATES } from '../../initializers/constants.js';
import { exists } from './misc.js';
const USER_REGISTRATIONS_CONSTRAINTS_FIELDS = CONSTRAINTS_FIELDS.USER_REGISTRATIONS;
function isRegistrationStateValid(value) {
    return exists(value) && USER_REGISTRATION_STATES[value] !== undefined;
}
function isRegistrationModerationResponseValid(value) {
    return exists(value) && validator.default.isLength(value, USER_REGISTRATIONS_CONSTRAINTS_FIELDS.MODERATOR_MESSAGE);
}
function isRegistrationReasonValid(value) {
    return exists(value) && validator.default.isLength(value, USER_REGISTRATIONS_CONSTRAINTS_FIELDS.REASON_MESSAGE);
}
export { isRegistrationStateValid, isRegistrationModerationResponseValid, isRegistrationReasonValid };
//# sourceMappingURL=user-registration.js.map