import { exists } from './misc.js';
function isVideoTimeValid(value, videoDuration) {
    if (value < 0)
        return false;
    if (exists(videoDuration) && value > videoDuration)
        return false;
    return true;
}
export { isVideoTimeValid };
//# sourceMappingURL=video-view.js.map