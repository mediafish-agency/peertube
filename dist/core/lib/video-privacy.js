import { move } from 'fs-extra/esm';
import { join } from 'path';
import { VideoPrivacy, FileStorage } from '@peertube/peertube-models';
import { logger } from '../helpers/logger.js';
import { DIRECTORIES } from '../initializers/constants.js';
import { updateHLSFilesACL, updateWebVideoFileACL } from './object-storage/index.js';
const validPrivacySet = new Set([
    VideoPrivacy.PRIVATE,
    VideoPrivacy.INTERNAL,
    VideoPrivacy.PASSWORD_PROTECTED
]);
function setVideoPrivacy(video, newPrivacy) {
    if (video.privacy === VideoPrivacy.PRIVATE && newPrivacy !== VideoPrivacy.PRIVATE) {
        video.publishedAt = new Date();
    }
    video.privacy = newPrivacy;
}
function isVideoInPrivateDirectory(privacy) {
    return validPrivacySet.has(privacy);
}
function isVideoInPublicDirectory(privacy) {
    return !isVideoInPrivateDirectory(privacy);
}
async function moveFilesIfPrivacyChanged(video, oldPrivacy) {
    if (isVideoInPublicDirectory(video.privacy) && isVideoInPrivateDirectory(oldPrivacy)) {
        await moveFiles({ type: 'private-to-public', video });
        return true;
    }
    if (isVideoInPrivateDirectory(video.privacy) && isVideoInPublicDirectory(oldPrivacy)) {
        await moveFiles({ type: 'public-to-private', video });
        return true;
    }
    return false;
}
export { setVideoPrivacy, isVideoInPrivateDirectory, isVideoInPublicDirectory, moveFilesIfPrivacyChanged };
async function moveFiles(options) {
    const { type, video } = options;
    for (const file of video.VideoFiles) {
        if (file.storage === FileStorage.FILE_SYSTEM) {
            await moveWebVideoFileOnFS(type, video, file);
        }
        else {
            await updateWebVideoFileACL(video, file);
        }
    }
    const hls = video.getHLSPlaylist();
    if (hls) {
        if (hls.storage === FileStorage.FILE_SYSTEM) {
            await moveHLSFilesOnFS(type, video);
        }
        else {
            await updateHLSFilesACL(hls);
        }
    }
}
async function moveWebVideoFileOnFS(type, video, file) {
    const directories = getWebVideoDirectories(type);
    const source = join(directories.old, file.filename);
    const destination = join(directories.new, file.filename);
    try {
        logger.info('Moving web video files of %s after privacy change (%s -> %s).', video.uuid, source, destination);
        await move(source, destination);
    }
    catch (err) {
        logger.error('Cannot move web video file %s to %s after privacy change', source, destination, { err });
    }
}
function getWebVideoDirectories(moveType) {
    if (moveType === 'private-to-public') {
        return { old: DIRECTORIES.WEB_VIDEOS.PRIVATE, new: DIRECTORIES.WEB_VIDEOS.PUBLIC };
    }
    return { old: DIRECTORIES.WEB_VIDEOS.PUBLIC, new: DIRECTORIES.WEB_VIDEOS.PRIVATE };
}
async function moveHLSFilesOnFS(type, video) {
    const directories = getHLSDirectories(type);
    const source = join(directories.old, video.uuid);
    const destination = join(directories.new, video.uuid);
    try {
        logger.info('Moving HLS files of %s after privacy change (%s -> %s).', video.uuid, source, destination);
        await move(source, destination);
    }
    catch (err) {
        logger.error('Cannot move HLS file %s to %s after privacy change', source, destination, { err });
    }
}
function getHLSDirectories(moveType) {
    if (moveType === 'private-to-public') {
        return { old: DIRECTORIES.HLS_STREAMING_PLAYLIST.PRIVATE, new: DIRECTORIES.HLS_STREAMING_PLAYLIST.PUBLIC };
    }
    return { old: DIRECTORIES.HLS_STREAMING_PLAYLIST.PUBLIC, new: DIRECTORIES.HLS_STREAMING_PLAYLIST.PRIVATE };
}
//# sourceMappingURL=video-privacy.js.map