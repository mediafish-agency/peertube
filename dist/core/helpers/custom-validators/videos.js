import { HttpStatusCode, VideoPrivacy } from '@peertube/peertube-models';
import { getVideoWithAttributes } from '../video.js';
import { decode as magnetUriDecode } from 'magnet-uri';
import validator from 'validator';
import { CONSTRAINTS_FIELDS, MIMETYPES, VIDEO_CATEGORIES, VIDEO_COMMENTS_POLICY, VIDEO_LICENCES, VIDEO_LIVE, VIDEO_PRIVACIES, VIDEO_RATE_TYPES, VIDEO_STATES } from '../../initializers/constants.js';
import { exists, isArray, isDateValid, isFileValid } from './misc.js';
const VIDEOS_CONSTRAINTS_FIELDS = CONSTRAINTS_FIELDS.VIDEOS;
export function isVideoIncludeValid(include) {
    return exists(include) && validator.default.isInt('' + include);
}
export function isVideoCategoryValid(value) {
    return value === null || VIDEO_CATEGORIES[value] !== undefined;
}
export function isVideoStateValid(value) {
    return exists(value) && VIDEO_STATES[value] !== undefined;
}
export function isVideoLicenceValid(value) {
    return value === null || VIDEO_LICENCES[value] !== undefined;
}
export function isVideoLanguageValid(value) {
    return value === null ||
        (typeof value === 'string' && validator.default.isLength(value, VIDEOS_CONSTRAINTS_FIELDS.LANGUAGE));
}
export function isVideoDurationValid(value) {
    return exists(value) && validator.default.isInt(value + '', VIDEOS_CONSTRAINTS_FIELDS.DURATION);
}
export function isVideoDescriptionValid(value) {
    return value === null || (exists(value) && validator.default.isLength(value, VIDEOS_CONSTRAINTS_FIELDS.DESCRIPTION));
}
export function isVideoCommentsPolicyValid(value) {
    return value === null || VIDEO_COMMENTS_POLICY[value] !== undefined;
}
export function isVideoSupportValid(value) {
    return value === null || (exists(value) && validator.default.isLength(value, VIDEOS_CONSTRAINTS_FIELDS.SUPPORT));
}
export function isVideoNameValid(value) {
    return exists(value) && validator.default.isLength(value, VIDEOS_CONSTRAINTS_FIELDS.NAME);
}
export function isVideoSourceFilenameValid(value) {
    return exists(value) && validator.default.isLength(value, CONSTRAINTS_FIELDS.VIDEO_SOURCE.FILENAME);
}
export function isVideoTagValid(tag) {
    return exists(tag) && validator.default.isLength(tag, VIDEOS_CONSTRAINTS_FIELDS.TAG);
}
export function areVideoTagsValid(tags) {
    return tags === null || (isArray(tags) &&
        validator.default.isInt(tags.length.toString(), VIDEOS_CONSTRAINTS_FIELDS.TAGS) &&
        tags.every(tag => isVideoTagValid(tag)));
}
export function isVideoViewsValid(value) {
    return exists(value) && validator.default.isInt(value + '', VIDEOS_CONSTRAINTS_FIELDS.VIEWS);
}
const ratingTypes = new Set(Object.values(VIDEO_RATE_TYPES));
export function isVideoRatingTypeValid(value) {
    return value === 'none' || ratingTypes.has(value);
}
export function isVideoFileExtnameValid(value) {
    return exists(value) && (value === VIDEO_LIVE.EXTENSION || MIMETYPES.VIDEO.EXT_MIMETYPE[value] !== undefined);
}
export function isVideoFileMimeTypeValid(files, field = 'videofile') {
    return isFileValid({
        files,
        mimeTypeRegex: MIMETYPES.VIDEO.MIMETYPES_REGEX,
        field,
        maxSize: null
    });
}
const videoImageTypes = CONSTRAINTS_FIELDS.VIDEOS.IMAGE.EXTNAME
    .map(v => v.replace('.', ''))
    .join('|');
const videoImageTypesRegex = `image/(${videoImageTypes})`;
export function isVideoImageValid(files, field, optional = true) {
    return isFileValid({
        files,
        mimeTypeRegex: videoImageTypesRegex,
        field,
        maxSize: CONSTRAINTS_FIELDS.VIDEOS.IMAGE.FILE_SIZE.max,
        optional
    });
}
export function isVideoPrivacyValid(value) {
    return VIDEO_PRIVACIES[value] !== undefined;
}
export function isVideoReplayPrivacyValid(value) {
    return VIDEO_PRIVACIES[value] !== undefined && value !== VideoPrivacy.PASSWORD_PROTECTED;
}
export function isScheduleVideoUpdatePrivacyValid(value) {
    return value === VideoPrivacy.UNLISTED || value === VideoPrivacy.PUBLIC || value === VideoPrivacy.INTERNAL;
}
export function isVideoOriginallyPublishedAtValid(value) {
    return value === null || isDateValid(value);
}
export function isVideoFileInfoHashValid(value) {
    return exists(value) && validator.default.isLength(value, VIDEOS_CONSTRAINTS_FIELDS.INFO_HASH);
}
export function isVideoFileResolutionValid(value) {
    return exists(value) && validator.default.isInt(value + '');
}
export function isVideoFPSResolutionValid(value) {
    return value === null || validator.default.isInt(value + '');
}
export function isVideoFileSizeValid(value) {
    return exists(value) && validator.default.isInt(value + '', VIDEOS_CONSTRAINTS_FIELDS.FILE_SIZE);
}
export function isVideoMagnetUriValid(value) {
    if (!exists(value))
        return false;
    const parsed = magnetUriDecode(value);
    return parsed && isVideoFileInfoHashValid(parsed.infoHash);
}
export function isPasswordValid(password) {
    return password.length >= CONSTRAINTS_FIELDS.VIDEO_PASSWORD.LENGTH.min &&
        password.length < CONSTRAINTS_FIELDS.VIDEO_PASSWORD.LENGTH.max;
}
export function isValidPasswordProtectedPrivacy(req, res) {
    var _a;
    const fail = (message) => {
        res.fail({
            status: HttpStatusCode.BAD_REQUEST_400,
            message
        });
        return false;
    };
    let privacy;
    const video = getVideoWithAttributes(res);
    if (exists((_a = req.body) === null || _a === void 0 ? void 0 : _a.privacy))
        privacy = req.body.privacy;
    else if (exists(video === null || video === void 0 ? void 0 : video.privacy))
        privacy = video.privacy;
    if (privacy !== VideoPrivacy.PASSWORD_PROTECTED)
        return true;
    if (!exists(req.body.videoPasswords) && !exists(req.body.passwords))
        return fail('Video passwords are missing.');
    const passwords = req.body.videoPasswords || req.body.passwords;
    if (passwords.length === 0)
        return fail('At least one video password is required.');
    if (new Set(passwords).size !== passwords.length)
        return fail('Duplicate video passwords are not allowed.');
    for (const password of passwords) {
        if (typeof password !== 'string') {
            return fail('Video password should be a string.');
        }
        if (!isPasswordValid(password)) {
            return fail('Invalid video password. Password length should be at least 2 characters and no more than 100 characters.');
        }
    }
    return true;
}
//# sourceMappingURL=videos.js.map