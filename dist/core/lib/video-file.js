import { FFmpegContainer, ffprobePromise, getVideoStreamDimensionsInfo, getVideoStreamFPS, hasAudioStream, hasVideoStream, isAudioFile } from '@peertube/peertube-ffmpeg';
import { FileStorage, VideoFileFormatFlag, VideoFileMetadata, VideoFileStream, VideoResolution } from '@peertube/peertube-models';
import { getFileSize, getLowercaseExtension } from '@peertube/peertube-node-utils';
import { getFFmpegCommandWrapperOptions } from '../helpers/ffmpeg/ffmpeg-options.js';
import { logger, loggerTagsFactory } from '../helpers/logger.js';
import { doRequestAndSaveToFile, generateRequestStream } from '../helpers/requests.js';
import { CONFIG } from '../initializers/config.js';
import { MIMETYPES, REQUEST_TIMEOUTS } from '../initializers/constants.js';
import { VideoFileModel } from '../models/video/video-file.js';
import { VideoSourceModel } from '../models/video/video-source.js';
import { move, remove } from 'fs-extra/esm';
import { lTags } from './object-storage/shared/index.js';
import { getHLSFileReadStream, getWebVideoFileReadStream, makeHLSFileAvailable, makeWebVideoFileAvailable, storeOriginalVideoFile } from './object-storage/videos.js';
import { generateHLSVideoFilename, generateWebVideoFilename } from './paths.js';
import { VideoPathManager } from './video-path-manager.js';
export async function buildNewFile(options) {
    const { path, mode, ffprobe: probeArg } = options;
    const probe = probeArg !== null && probeArg !== void 0 ? probeArg : await ffprobePromise(path);
    const size = await getFileSize(path);
    const videoFile = new VideoFileModel({
        extname: getLowercaseExtension(path),
        size,
        metadata: await buildFileMetadata(path, probe),
        streams: VideoFileStream.NONE,
        formatFlags: mode === 'web-video'
            ? VideoFileFormatFlag.WEB_VIDEO
            : VideoFileFormatFlag.FRAGMENTED
    });
    if (await hasAudioStream(path, probe)) {
        videoFile.streams |= VideoFileStream.AUDIO;
    }
    if (await hasVideoStream(path, probe)) {
        videoFile.streams |= VideoFileStream.VIDEO;
    }
    if (await isAudioFile(path, probe)) {
        videoFile.fps = 0;
        videoFile.resolution = VideoResolution.H_NOVIDEO;
        videoFile.width = 0;
        videoFile.height = 0;
    }
    else {
        const dimensions = await getVideoStreamDimensionsInfo(path, probe);
        videoFile.fps = await getVideoStreamFPS(path, probe);
        videoFile.resolution = dimensions.resolution;
        videoFile.width = dimensions.width;
        videoFile.height = dimensions.height;
    }
    videoFile.filename = mode === 'web-video'
        ? generateWebVideoFilename(videoFile.resolution, videoFile.extname)
        : generateHLSVideoFilename(videoFile.resolution);
    return videoFile;
}
export async function removeHLSPlaylist(video) {
    const hls = video.getHLSPlaylist();
    if (!hls)
        return;
    const videoFileMutexReleaser = await VideoPathManager.Instance.lockFiles(video.uuid);
    try {
        await video.removeStreamingPlaylistFiles(hls);
        await hls.destroy();
        video.VideoStreamingPlaylists = video.VideoStreamingPlaylists.filter(p => p.id !== hls.id);
    }
    finally {
        videoFileMutexReleaser();
    }
}
export async function removeHLSFile(video, fileToDeleteId) {
    const hls = video.getHLSPlaylist();
    const files = hls.VideoFiles;
    if (files.length === 1) {
        await removeHLSPlaylist(video);
        return undefined;
    }
    const videoFileMutexReleaser = await VideoPathManager.Instance.lockFiles(video.uuid);
    try {
        const toDelete = files.find(f => f.id === fileToDeleteId);
        await video.removeStreamingPlaylistVideoFile(video.getHLSPlaylist(), toDelete);
        await toDelete.destroy();
        hls.VideoFiles = hls.VideoFiles.filter(f => f.id !== toDelete.id);
    }
    finally {
        videoFileMutexReleaser();
    }
    return hls;
}
export async function removeAllWebVideoFiles(video) {
    const videoFileMutexReleaser = await VideoPathManager.Instance.lockFiles(video.uuid);
    try {
        for (const file of video.VideoFiles) {
            await video.removeWebVideoFile(file);
            await file.destroy();
        }
        video.VideoFiles = [];
    }
    finally {
        videoFileMutexReleaser();
    }
    return video;
}
export async function removeWebVideoFile(video, fileToDeleteId) {
    const files = video.VideoFiles;
    if (files.length === 1) {
        return removeAllWebVideoFiles(video);
    }
    const videoFileMutexReleaser = await VideoPathManager.Instance.lockFiles(video.uuid);
    try {
        const toDelete = files.find(f => f.id === fileToDeleteId);
        await video.removeWebVideoFile(toDelete);
        await toDelete.destroy();
        video.VideoFiles = files.filter(f => f.id !== toDelete.id);
    }
    finally {
        videoFileMutexReleaser();
    }
    return video;
}
export async function buildFileMetadata(path, existingProbe) {
    const metadata = existingProbe || await ffprobePromise(path);
    return new VideoFileMetadata(metadata);
}
export function getVideoFileMimeType(extname, isAudio) {
    return isAudio && extname === '.mp4'
        ? MIMETYPES.AUDIO.EXT_MIMETYPE['.m4a']
        : MIMETYPES.VIDEO.EXT_MIMETYPE[extname];
}
export async function createVideoSource(options) {
    const { inputFilename, inputPath, inputProbe, video, createdAt } = options;
    const videoSource = new VideoSourceModel({
        inputFilename,
        videoId: video.id,
        createdAt
    });
    if (inputPath) {
        const probe = inputProbe !== null && inputProbe !== void 0 ? inputProbe : await ffprobePromise(inputPath);
        if (await isAudioFile(inputPath, probe)) {
            videoSource.fps = 0;
            videoSource.resolution = VideoResolution.H_NOVIDEO;
            videoSource.width = 0;
            videoSource.height = 0;
        }
        else {
            const dimensions = await getVideoStreamDimensionsInfo(inputPath, probe);
            videoSource.fps = await getVideoStreamFPS(inputPath, probe);
            videoSource.resolution = dimensions.resolution;
            videoSource.width = dimensions.width;
            videoSource.height = dimensions.height;
        }
        videoSource.metadata = await buildFileMetadata(inputPath, probe);
        videoSource.size = await getFileSize(inputPath);
    }
    return videoSource.save();
}
export async function saveNewOriginalFileIfNeeded(video, videoFile) {
    if (!CONFIG.TRANSCODING.ORIGINAL_FILE.KEEP)
        return;
    const videoSource = await VideoSourceModel.loadLatest(video.id);
    if (!videoSource || videoSource.keptOriginalFilename)
        return;
    videoSource.keptOriginalFilename = videoFile.filename;
    const lTags = loggerTagsFactory(video.uuid);
    logger.info(`Storing original video file ${videoSource.keptOriginalFilename} of video ${video.name}`, lTags());
    const sourcePath = VideoPathManager.Instance.getFSVideoFileOutputPath(video, videoFile);
    if (CONFIG.OBJECT_STORAGE.ENABLED) {
        const fileUrl = await storeOriginalVideoFile(sourcePath, videoSource.keptOriginalFilename);
        await remove(sourcePath);
        videoSource.storage = FileStorage.OBJECT_STORAGE;
        videoSource.fileUrl = fileUrl;
    }
    else {
        const destinationPath = VideoPathManager.Instance.getFSOriginalVideoFilePath(videoSource.keptOriginalFilename);
        await move(sourcePath, destinationPath);
        videoSource.storage = FileStorage.FILE_SYSTEM;
    }
    await videoSource.save();
    const allSources = await VideoSourceModel.listAll(video.id);
    for (const oldSource of allSources) {
        if (!oldSource.keptOriginalFilename)
            continue;
        if (oldSource.id === videoSource.id)
            continue;
        try {
            await video.removeOriginalFile(oldSource);
        }
        catch (err) {
            logger.error('Cannot delete old original file ' + oldSource.keptOriginalFilename, Object.assign({ err }, lTags()));
        }
    }
}
export async function muxToMergeVideoFiles(options) {
    const { video, videoFiles, output } = options;
    const inputs = [];
    const tmpDestinations = [];
    try {
        let maxResolution = 0;
        for (const videoFile of videoFiles) {
            if (!videoFile)
                continue;
            maxResolution = Math.max(maxResolution, videoFile.resolution);
            const { input, isTmpDestination } = await buildMuxInput(video, videoFile);
            inputs.push(input);
            if (isTmpDestination === true)
                tmpDestinations.push(input);
        }
        const { coverPath, isTmpDestination } = maxResolution === 0
            ? await buildCoverInput(video)
            : { coverPath: undefined, isTmpDestination: false };
        if (coverPath && isTmpDestination)
            tmpDestinations.push(coverPath);
        const inputsToLog = inputs.map(i => {
            if (typeof i === 'string')
                return i;
            return 'ReadableStream';
        });
        logger.info(`Muxing files for video ${video.url}`, Object.assign({ inputs: inputsToLog }, lTags(video.uuid)));
        try {
            await new FFmpegContainer(getFFmpegCommandWrapperOptions('vod')).mergeInputs({
                inputs,
                output,
                logError: false,
                coverPath
            });
            logger.info(`Mux ended for video ${video.url}`, Object.assign({ inputs: inputsToLog }, lTags(video.uuid)));
        }
        catch (err) {
            const message = (err === null || err === void 0 ? void 0 : err.message) || '';
            if (message.includes('Output stream closed')) {
                logger.info(`Client aborted mux for video ${video.url}`, lTags(video.uuid));
                return;
            }
            logger.warn(`Cannot mux files of video ${video.url}`, Object.assign({ err, inputs: inputsToLog }, lTags(video.uuid)));
            throw err;
        }
    }
    finally {
        for (const destination of tmpDestinations) {
            await remove(destination);
        }
    }
}
async function buildMuxInput(video, videoFile) {
    if (video.remote === true) {
        const timeout = REQUEST_TIMEOUTS.VIDEO_FILE;
        const videoSizeKB = videoFile.size / 1000;
        const bodyKBLimit = videoSizeKB + 0.1 * videoSizeKB;
        if (videoFile.isAudio()) {
            const destination = VideoPathManager.Instance.buildTMPDestination(videoFile.filename);
            if (bodyKBLimit > 1000 * 1000) {
                throw new Error('Cannot download remote video file > 1GB');
            }
            await doRequestAndSaveToFile(videoFile.fileUrl, destination, { timeout, bodyKBLimit });
            return { input: destination, isTmpDestination: true };
        }
        return { input: generateRequestStream(videoFile.fileUrl, { timeout, bodyKBLimit }), isTmpDestination: false };
    }
    if (videoFile.storage === FileStorage.FILE_SYSTEM) {
        return { input: VideoPathManager.Instance.getFSVideoFileOutputPath(video, videoFile), isTmpDestination: false };
    }
    if (videoFile.hasAudio() && !videoFile.hasVideo()) {
        const destination = VideoPathManager.Instance.buildTMPDestination(videoFile.filename);
        if (videoFile.isHLS()) {
            await makeHLSFileAvailable(video.getHLSPlaylist(), videoFile.filename, destination);
        }
        else {
            await makeWebVideoFileAvailable(videoFile.filename, destination);
        }
        return { input: destination, isTmpDestination: true };
    }
    if (videoFile.isHLS()) {
        const { stream } = await getHLSFileReadStream({
            playlist: video.getHLSPlaylist().withVideo(video),
            filename: videoFile.filename,
            rangeHeader: undefined
        });
        return { input: stream, isTmpDestination: false };
    }
    const { stream } = await getWebVideoFileReadStream({
        filename: videoFile.filename,
        rangeHeader: undefined
    });
    return { input: stream, isTmpDestination: false };
}
async function buildCoverInput(video) {
    const preview = video.getPreview();
    if (video.isOwned())
        return { coverPath: preview === null || preview === void 0 ? void 0 : preview.getPath() };
    if (preview.fileUrl) {
        const destination = VideoPathManager.Instance.buildTMPDestination(preview.filename);
        await doRequestAndSaveToFile(preview.fileUrl, destination);
        return { coverPath: destination, isTmpDestination: true };
    }
    return { coverPath: undefined };
}
//# sourceMappingURL=video-file.js.map