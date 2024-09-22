import Bluebird from 'bluebird';
import { move } from 'fs-extra/esm';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { initDatabaseModels } from '../../core/initializers/database.js';
import { federateVideoIfNeeded } from '../../core/lib/activitypub/videos/index.js';
import { JobQueue } from '../../core/lib/job-queue/index.js';
import { generateHLSMasterPlaylistFilename, generateHlsSha256SegmentsFilename, getHlsResolutionPlaylistFilename } from '../../core/lib/paths.js';
import { VideoPathManager } from '../../core/lib/video-path-manager.js';
import { VideoStreamingPlaylistModel } from '../../core/models/video/video-streaming-playlist.js';
import { VideoModel } from '../../core/models/video/video.js';
run()
    .then(() => process.exit(0))
    .catch(err => {
    console.error(err);
    process.exit(-1);
});
async function run() {
    console.log('Migrate old HLS paths to new format.');
    await initDatabaseModels(true);
    JobQueue.Instance.init();
    const ids = await VideoModel.listLocalIds();
    await Bluebird.map(ids, async (id) => {
        try {
            await processVideo(id);
        }
        catch (err) {
            console.error('Cannot process video %s.', { err });
        }
    }, { concurrency: 5 });
    console.log('Migration finished!');
}
async function processVideo(videoId) {
    const video = await VideoModel.loadWithFiles(videoId);
    const hls = video.getHLSPlaylist();
    if (video.isLive || !hls || hls.playlistFilename !== 'master.m3u8' || hls.VideoFiles.length === 0) {
        return;
    }
    console.log(`Renaming HLS playlist files of video ${video.name}.`);
    const playlist = await VideoStreamingPlaylistModel.loadHLSPlaylistByVideo(video.id);
    const hlsDirPath = VideoPathManager.Instance.getFSHLSOutputPath(video);
    const masterPlaylistPath = join(hlsDirPath, playlist.playlistFilename);
    let masterPlaylistContent = await readFile(masterPlaylistPath, 'utf8');
    for (const videoFile of hls.VideoFiles) {
        const srcName = `${videoFile.resolution}.m3u8`;
        const dstName = getHlsResolutionPlaylistFilename(videoFile.filename);
        const src = join(hlsDirPath, srcName);
        const dst = join(hlsDirPath, dstName);
        try {
            await move(src, dst);
            masterPlaylistContent = masterPlaylistContent.replace(new RegExp('^' + srcName + '$', 'm'), dstName);
        }
        catch (err) {
            console.error('Cannot move video file %s to %s.', src, dst, err);
        }
    }
    await writeFile(masterPlaylistPath, masterPlaylistContent);
    if (playlist.segmentsSha256Filename === 'segments-sha256.json') {
        try {
            const newName = generateHlsSha256SegmentsFilename(video.isLive);
            const dst = join(hlsDirPath, newName);
            await move(join(hlsDirPath, playlist.segmentsSha256Filename), dst);
            playlist.segmentsSha256Filename = newName;
        }
        catch (err) {
            console.error(`Cannot rename ${video.name} segments-sha256.json file to a new name`, err);
        }
    }
    if (playlist.playlistFilename === 'master.m3u8') {
        try {
            const newName = generateHLSMasterPlaylistFilename(video.isLive);
            const dst = join(hlsDirPath, newName);
            await move(join(hlsDirPath, playlist.playlistFilename), dst);
            playlist.playlistFilename = newName;
        }
        catch (err) {
            console.error(`Cannot rename ${video.name} master.m3u8 file to a new name`, err);
        }
    }
    await playlist.save();
    const allVideo = await VideoModel.loadFull(video.id);
    await federateVideoIfNeeded(allVideo, false);
    console.log(`Successfully moved HLS files of ${video.name}.`);
}
//# sourceMappingURL=peertube-4.0.js.map