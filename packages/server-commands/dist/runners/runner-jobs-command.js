import { omit, pick, wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode, RunnerJobState, isHLSTranscodingPayloadSuccess, isLiveRTMPHLSTranscodingUpdatePayload, isTranscriptionPayloadSuccess, isWebVideoOrAudioMergeTranscodingPayloadSuccess } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { waitJobs } from '../server/jobs.js';
import { AbstractCommand } from '../shared/index.js';
export class RunnerJobsCommand extends AbstractCommand {
    list(options = {}) {
        const path = '/api/v1/runners/jobs';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort', 'search', 'stateOneOf']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    cancelByAdmin(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/cancel';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    deleteByAdmin(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    request(options) {
        const path = '/api/v1/runners/jobs/request';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['runnerToken']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    async requestVOD(options) {
        const vodTypes = new Set(['vod-audio-merge-transcoding', 'vod-hls-transcoding', 'vod-web-video-transcoding']);
        const { availableJobs } = await this.request(options);
        return {
            availableJobs: availableJobs.filter(j => vodTypes.has(j.type))
        };
    }
    async requestLive(options) {
        const vodTypes = new Set(['live-rtmp-hls-transcoding']);
        const { availableJobs } = await this.request(options);
        return {
            availableJobs: availableJobs.filter(j => vodTypes.has(j.type))
        };
    }
    accept(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/accept';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['runnerToken']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    abort(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/abort';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['reason', 'jobToken', 'runnerToken']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    update(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/update';
        const { payload } = options;
        const attaches = {};
        let payloadWithoutFiles = payload;
        if (isLiveRTMPHLSTranscodingUpdatePayload(payload)) {
            if (payload.masterPlaylistFile) {
                attaches[`payload[masterPlaylistFile]`] = payload.masterPlaylistFile;
            }
            attaches[`payload[resolutionPlaylistFile]`] = payload.resolutionPlaylistFile;
            attaches[`payload[videoChunkFile]`] = payload.videoChunkFile;
            payloadWithoutFiles = omit(payloadWithoutFiles, ['masterPlaylistFile', 'resolutionPlaylistFile', 'videoChunkFile']);
        }
        return this.postUploadRequest(Object.assign(Object.assign({}, options), { path, fields: Object.assign(Object.assign({}, pick(options, ['progress', 'jobToken', 'runnerToken'])), { payload: payloadWithoutFiles }), attaches, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    error(options) {
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/error';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['message', 'jobToken', 'runnerToken']), implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    success(options) {
        const { payload } = options;
        const path = '/api/v1/runners/jobs/' + options.jobUUID + '/success';
        const attaches = {};
        let payloadWithoutFiles = payload;
        if ((isWebVideoOrAudioMergeTranscodingPayloadSuccess(payload) || isHLSTranscodingPayloadSuccess(payload)) && payload.videoFile) {
            attaches[`payload[videoFile]`] = payload.videoFile;
            payloadWithoutFiles = omit(payloadWithoutFiles, ['videoFile']);
        }
        if (isHLSTranscodingPayloadSuccess(payload) && payload.resolutionPlaylistFile) {
            attaches[`payload[resolutionPlaylistFile]`] = payload.resolutionPlaylistFile;
            payloadWithoutFiles = omit(payloadWithoutFiles, ['resolutionPlaylistFile']);
        }
        if (isTranscriptionPayloadSuccess(payload) && payload.vttFile) {
            attaches[`payload[vttFile]`] = payload.vttFile;
            payloadWithoutFiles = omit(payloadWithoutFiles, ['vttFile']);
        }
        return this.postUploadRequest(Object.assign(Object.assign({}, options), { path,
            attaches, fields: Object.assign(Object.assign({}, pick(options, ['jobToken', 'runnerToken'])), { payload: payloadWithoutFiles }), implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getJobFile(options) {
        const { host, protocol, pathname } = new URL(options.url);
        return this.postBodyRequest({
            url: `${protocol}//${host}`,
            path: pathname,
            fields: pick(options, ['jobToken', 'runnerToken']),
            implicitToken: false,
            defaultExpectedStatus: HttpStatusCode.OK_200
        });
    }
    async autoAccept(options) {
        const { availableJobs } = await this.request(options);
        const job = options.type
            ? availableJobs.find(j => j.type === options.type)
            : availableJobs[0];
        return this.accept(Object.assign(Object.assign({}, options), { jobUUID: job.uuid }));
    }
    async autoProcessWebVideoJob(runnerToken, jobUUIDToProcess) {
        let jobUUID = jobUUIDToProcess;
        if (!jobUUID) {
            const { availableJobs } = await this.request({ runnerToken });
            jobUUID = availableJobs[0].uuid;
        }
        const { job } = await this.accept({ runnerToken, jobUUID });
        const jobToken = job.jobToken;
        const payload = { videoFile: 'video_short.mp4' };
        await this.success({ runnerToken, jobUUID, jobToken, payload });
        await waitJobs([this.server]);
        return job;
    }
    async cancelAllJobs(options = {}) {
        const { state } = options;
        const { data } = await this.list({ count: 100 });
        const allowedStates = new Set([
            RunnerJobState.PENDING,
            RunnerJobState.PROCESSING,
            RunnerJobState.WAITING_FOR_PARENT_JOB
        ]);
        for (const job of data) {
            if (state && job.state.id !== state)
                continue;
            else if (allowedStates.has(job.state.id) !== true)
                continue;
            await this.cancelByAdmin({ jobUUID: job.uuid });
        }
    }
    async getJob(options) {
        const { data } = await this.list(Object.assign(Object.assign({}, options), { count: 100, sort: '-updatedAt' }));
        return data.find(j => j.uuid === options.uuid);
    }
    async requestLiveJob(runnerToken) {
        let availableJobs = [];
        while (availableJobs.length === 0) {
            const result = await this.requestLive({ runnerToken });
            availableJobs = result.availableJobs;
            if (availableJobs.length === 1)
                break;
            await wait(150);
        }
        return availableJobs[0];
    }
}
//# sourceMappingURL=runner-jobs-command.js.map