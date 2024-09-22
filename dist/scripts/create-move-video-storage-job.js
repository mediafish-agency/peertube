import { program } from 'commander';
import { toCompleteUUID } from '../core/helpers/custom-validators/misc.js';
import { CONFIG } from '../core/initializers/config.js';
import { initDatabaseModels } from '../core/initializers/database.js';
import { JobQueue } from '../core/lib/job-queue/index.js';
import { moveToExternalStorageState, moveToFileSystemState } from '../core/lib/video-state.js';
import { VideoModel } from '../core/models/video/video.js';
import { VideoState, FileStorage } from '@peertube/peertube-models';
program
    .description('Move videos to another storage.')
    .option('-o, --to-object-storage', 'Move videos in object storage')
    .option('-f, --to-file-system', 'Move videos to file system')
    .option('-v, --video [videoUUID]', 'Move a specific video')
    .option('-a, --all-videos', 'Migrate all videos')
    .parse(process.argv);
const options = program.opts();
if (!options['toObjectStorage'] && !options['toFileSystem']) {
    console.error('You need to choose where to send video files using --to-object-storage or --to-file-system.');
    process.exit(-1);
}
if (!options['video'] && !options['allVideos']) {
    console.error('You need to choose which videos to move.');
    process.exit(-1);
}
if (options['toObjectStorage'] && !CONFIG.OBJECT_STORAGE.ENABLED) {
    console.error('Object storage is not enabled on this instance.');
    process.exit(-1);
}
run()
    .then(() => process.exit(0))
    .catch(err => {
    console.error(err);
    process.exit(-1);
});
async function run() {
    await initDatabaseModels(true);
    JobQueue.Instance.init();
    let ids = [];
    if (options['video']) {
        const video = await VideoModel.load(toCompleteUUID(options['video']));
        if (!video) {
            console.error('Unknown video ' + options['video']);
            process.exit(-1);
        }
        if (video.remote === true) {
            console.error('Cannot process a remote video');
            process.exit(-1);
        }
        if (video.isLive) {
            console.error('Cannot process live video');
            process.exit(-1);
        }
        if (video.state === VideoState.TO_MOVE_TO_EXTERNAL_STORAGE || video.state === VideoState.TO_MOVE_TO_FILE_SYSTEM) {
            console.error('This video is already being moved to external storage/file system');
            process.exit(-1);
        }
        ids.push(video.id);
    }
    else {
        ids = await VideoModel.listLocalIds();
    }
    for (const id of ids) {
        const videoFull = await VideoModel.loadFull(id);
        if (videoFull.isLive)
            continue;
        if (options['toObjectStorage']) {
            await createMoveJobIfNeeded({
                video: videoFull,
                type: 'to object storage',
                canProcessVideo: (files, hls) => {
                    return files.some(f => f.storage === FileStorage.FILE_SYSTEM) || (hls === null || hls === void 0 ? void 0 : hls.storage) === FileStorage.FILE_SYSTEM;
                },
                handler: () => moveToExternalStorageState({ video: videoFull, isNewVideo: false, transaction: undefined })
            });
            continue;
        }
        if (options['toFileSystem']) {
            await createMoveJobIfNeeded({
                video: videoFull,
                type: 'to file system',
                canProcessVideo: (files, hls) => {
                    return files.some(f => f.storage === FileStorage.OBJECT_STORAGE) || (hls === null || hls === void 0 ? void 0 : hls.storage) === FileStorage.OBJECT_STORAGE;
                },
                handler: () => moveToFileSystemState({ video: videoFull, isNewVideo: false, transaction: undefined })
            });
        }
    }
}
async function createMoveJobIfNeeded(options) {
    const { video, type, canProcessVideo, handler } = options;
    const files = video.VideoFiles || [];
    const hls = video.getHLSPlaylist();
    if (canProcessVideo(files, hls)) {
        console.log(`Moving ${type} video ${video.name}`);
        const success = await handler();
        if (!success) {
            console.error(`Cannot create move ${type} for ${video.name}: job creation may have failed or there may be pending transcoding jobs for this video`);
        }
        else {
            console.log(`Created job ${type} for ${video.name}.`);
        }
    }
}
//# sourceMappingURL=create-move-video-storage-job.js.map