import { STATIC_PATHS, WEBSERVER } from '../initializers/constants.js';
function generateHLSRedundancyUrl(video, playlist) {
    return WEBSERVER.URL + STATIC_PATHS.REDUNDANCY + playlist.getStringType() + '/' + video.uuid;
}
function generateWebVideoRedundancyUrl(file) {
    return WEBSERVER.URL + STATIC_PATHS.REDUNDANCY + file.filename;
}
function getLocalVideoFileMetadataUrl(video, videoFile) {
    const path = '/api/v1/videos/';
    return WEBSERVER.URL + path + video.uuid + '/metadata/' + videoFile.id;
}
export { getLocalVideoFileMetadataUrl, generateWebVideoRedundancyUrl, generateHLSRedundancyUrl };
//# sourceMappingURL=video-urls.js.map