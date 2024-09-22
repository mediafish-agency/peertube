import { VideoStreamingPlaylistType } from '@peertube/peertube-models';
import { VideoRedundancyModel } from '../../models/redundancy/video-redundancy.js';
import { exists } from '../../helpers/custom-validators/misc.js';
async function createOrUpdateCacheFile(cacheFileObject, video, byActor, t) {
    const redundancyModel = await VideoRedundancyModel.loadByUrl(cacheFileObject.id, t);
    if (redundancyModel) {
        return updateCacheFile(cacheFileObject, redundancyModel, video, byActor, t);
    }
    return createCacheFile(cacheFileObject, video, byActor, t);
}
export { createOrUpdateCacheFile };
function createCacheFile(cacheFileObject, video, byActor, t) {
    const attributes = cacheFileActivityObjectToDBAttributes(cacheFileObject, video, byActor);
    return VideoRedundancyModel.create(attributes, { transaction: t });
}
function updateCacheFile(cacheFileObject, redundancyModel, video, byActor, t) {
    if (redundancyModel.actorId !== byActor.id) {
        throw new Error('Cannot update redundancy ' + redundancyModel.url + ' of another actor.');
    }
    const attributes = cacheFileActivityObjectToDBAttributes(cacheFileObject, video, byActor);
    redundancyModel.expiresOn = attributes.expiresOn;
    redundancyModel.fileUrl = attributes.fileUrl;
    return redundancyModel.save({ transaction: t });
}
function cacheFileActivityObjectToDBAttributes(cacheFileObject, video, byActor) {
    if (cacheFileObject.url.mediaType === 'application/x-mpegURL') {
        const url = cacheFileObject.url;
        const playlist = video.VideoStreamingPlaylists.find(t => t.type === VideoStreamingPlaylistType.HLS);
        if (!playlist)
            throw new Error('Cannot find HLS playlist of video ' + video.url);
        return {
            expiresOn: cacheFileObject.expires ? new Date(cacheFileObject.expires) : null,
            url: cacheFileObject.id,
            fileUrl: url.href,
            strategy: null,
            videoStreamingPlaylistId: playlist.id,
            actorId: byActor.id
        };
    }
    const url = cacheFileObject.url;
    const urlFPS = exists(url.fps)
        ? url.fps
        : url['_:fps'];
    const videoFile = video.VideoFiles.find(f => {
        return f.resolution === url.height && f.fps === urlFPS;
    });
    if (!videoFile)
        throw new Error(`Cannot find video file ${url.height} ${urlFPS} of video ${video.url}`);
    return {
        expiresOn: cacheFileObject.expires ? new Date(cacheFileObject.expires) : null,
        url: cacheFileObject.id,
        fileUrl: url.href,
        strategy: null,
        videoFileId: videoFile.id,
        actorId: byActor.id
    };
}
//# sourceMappingURL=cache-file.js.map