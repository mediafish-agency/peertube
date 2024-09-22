import { exists } from './misc.js';
function isValidCreateTranscodingType(value) {
    return exists(value) &&
        (value === 'hls' || value === 'webtorrent' || value === 'web-video');
}
export { isValidCreateTranscodingType };
//# sourceMappingURL=video-transcoding.js.map