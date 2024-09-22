import { VODAudioMergeTranscodingJobHandler, VODHLSTranscodingJobHandler, VODWebVideoTranscodingJobHandler } from '../../../runners/job-handlers/index.js';
import { getTranscodingJobPriority } from '../../transcoding-priority.js';
import { AbstractJobBuilder } from './abstract-job-builder.js';
export class TranscodingRunnerJobBuilder extends AbstractJobBuilder {
    async createJobs(options) {
        const { parent, children, user } = options;
        const parentJob = await this.createJob({ payload: parent, user });
        for (const parallelPayloads of children) {
            let lastJob = parentJob;
            for (const parallelPayload of parallelPayloads) {
                lastJob = await this.createJob({
                    payload: parallelPayload,
                    dependsOnRunnerJob: lastJob,
                    user
                });
            }
            lastJob = undefined;
        }
    }
    async createJob(options) {
        const { dependsOnRunnerJob, payload, user } = options;
        const builder = new payload.Builder();
        return builder.create(Object.assign(Object.assign({}, payload.options), { dependsOnRunnerJob, priority: await getTranscodingJobPriority({ user, type: 'vod', fallback: 0 }) }));
    }
    buildHLSJobPayload(options) {
        const { video, resolution, fps, isNewVideo, separatedAudio, deleteWebVideoFiles = false } = options;
        return {
            Builder: VODHLSTranscodingJobHandler,
            options: {
                video,
                resolution,
                fps,
                isNewVideo,
                separatedAudio,
                deleteWebVideoFiles
            }
        };
    }
    buildWebVideoJobPayload(options) {
        const { video, resolution, fps, isNewVideo } = options;
        return {
            Builder: VODWebVideoTranscodingJobHandler,
            options: {
                video,
                resolution,
                fps,
                isNewVideo,
                deleteInputFileId: null
            }
        };
    }
    buildMergeAudioPayload(options) {
        const { video, isNewVideo, inputFile, resolution, fps } = options;
        return {
            Builder: VODAudioMergeTranscodingJobHandler,
            options: {
                video,
                resolution,
                fps,
                isNewVideo,
                deleteInputFileId: inputFile.id
            }
        };
    }
    buildOptimizePayload(options) {
        const { video, isNewVideo, inputFile, fps, resolution } = options;
        return {
            Builder: VODWebVideoTranscodingJobHandler,
            options: {
                video,
                resolution,
                fps,
                isNewVideo,
                deleteInputFileId: inputFile.id
            }
        };
    }
}
//# sourceMappingURL=transcoding-runner-job-builder.js.map