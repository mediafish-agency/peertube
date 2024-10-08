import { isArray } from '../misc.js';
import { isVideoChapterTitleValid, isVideoChapterTimecodeValid } from '../video-chapters.js';
import { isActivityPubUrlValid } from './misc.js';
export function isVideoChaptersObjectValid(object) {
    if (!object)
        return false;
    if (!isActivityPubUrlValid(object.id))
        return false;
    if (!isArray(object.hasPart))
        return false;
    return object.hasPart.every(part => {
        return isVideoChapterTitleValid(part.name) && isVideoChapterTimecodeValid(part.startOffset);
    });
}
//# sourceMappingURL=video-chapters.js.map