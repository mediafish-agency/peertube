import { JobQueue } from '../../../job-queue/index.js';
import { VideoJobInfoModel } from '../../../../models/video/video-job-info.js';
import Bluebird from 'bluebird';
import { getTranscodingJobPriority } from '../../transcoding-priority.js';
import { AbstractJobBuilder } from './abstract-job-builder.js';
export class TranscodingJobQueueBuilder extends AbstractJobBuilder {
    async createJobs(options) {
        const { video, parent, children, user } = options;
        const nextTranscodingSequentialJobs = await Bluebird.mapSeries(children, payloads => {
            return Bluebird.mapSeries(payloads, payload => {
                return this.buildTranscodingJob({ payload, user });
            });
        });
        const transcodingJobBuilderJob = {
            type: 'transcoding-job-builder',
            payload: {
                videoUUID: video.uuid,
                sequentialJobs: nextTranscodingSequentialJobs
            }
        };
        const mergeOrOptimizeJob = await this.buildTranscodingJob({ payload: parent, user, hasChildren: !!children.length });
        await JobQueue.Instance.createSequentialJobFlow(mergeOrOptimizeJob, transcodingJobBuilderJob);
        await VideoJobInfoModel.increaseOrCreate(video.uuid, 'pendingTranscode');
    }
    async buildTranscodingJob(options) {
        const { user, payload, hasChildren = false } = options;
        return {
            type: 'video-transcoding',
            priority: await getTranscodingJobPriority({ user, type: 'vod', fallback: undefined }),
            payload: Object.assign(Object.assign({}, payload), { hasChildren })
        };
    }
    buildHLSJobPayload(options) {
        const { video, resolution, fps, isNewVideo, separatedAudio, deleteWebVideoFiles = false, copyCodecs = false } = options;
        return {
            type: 'new-resolution-to-hls',
            videoUUID: video.uuid,
            resolution,
            fps,
            copyCodecs,
            isNewVideo,
            separatedAudio,
            deleteWebVideoFiles
        };
    }
    buildWebVideoJobPayload(options) {
        const { video, resolution, fps, isNewVideo } = options;
        return {
            type: 'new-resolution-to-web-video',
            videoUUID: video.uuid,
            isNewVideo,
            resolution,
            fps
        };
    }
    buildMergeAudioPayload(options) {
        const { video, isNewVideo, resolution, fps } = options;
        return {
            type: 'merge-audio-to-web-video',
            resolution,
            fps,
            videoUUID: video.uuid,
            hasChildren: undefined,
            isNewVideo
        };
    }
    buildOptimizePayload(options) {
        const { video, quickTranscode, isNewVideo } = options;
        return {
            type: 'optimize-to-web-video',
            videoUUID: video.uuid,
            isNewVideo,
            hasChildren: undefined,
            quickTranscode
        };
    }
}
//# sourceMappingURL=transcoding-job-queue-builder.js.map