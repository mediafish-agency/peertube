import validator from 'validator';
import { getAllPrivacies, omit, pick, wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode, VideoCommentPolicy, VideoInclude, VideoPrivacy } from '@peertube/peertube-models';
import { buildAbsoluteFixturePath, buildUUID } from '@peertube/peertube-node-utils';
import { unwrapBody } from '../requests/index.js';
import { waitJobs } from '../server/jobs.js';
import { AbstractCommand } from '../shared/index.js';
export class VideosCommand extends AbstractCommand {
    getCategories(options = {}) {
        const path = '/api/v1/videos/categories';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getLicences(options = {}) {
        const path = '/api/v1/videos/licences';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getLanguages(options = {}) {
        const path = '/api/v1/videos/languages';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getPrivacies(options = {}) {
        const path = '/api/v1/videos/privacies';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getDescription(options) {
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: options.descriptionPath, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getFileMetadata(options) {
        return unwrapBody(this.getRawRequest(Object.assign(Object.assign({}, options), { url: options.url, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    rate(options) {
        const { id, rating, videoPassword } = options;
        const path = '/api/v1/videos/' + id + '/rate';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { rating }, headers: this.buildVideoPasswordHeader(videoPassword), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    get(options) {
        const path = '/api/v1/videos/' + options.id;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getWithToken(options) {
        return this.get(Object.assign(Object.assign({}, options), { token: this.buildCommonRequestToken(Object.assign(Object.assign({}, options), { implicitToken: true })) }));
    }
    getWithPassword(options) {
        const path = '/api/v1/videos/' + options.id;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { headers: {
                'x-peertube-video-password': options.password
            }, path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getSource(options) {
        const path = '/api/v1/videos/' + options.id + '/source';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    deleteSource(options) {
        const path = '/api/v1/videos/' + options.id + '/source/file';
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async getId(options) {
        const { uuid } = options;
        if (validator.default.isUUID('' + uuid) === false)
            return uuid;
        const { id } = await this.get(Object.assign(Object.assign({}, options), { id: uuid }));
        return id;
    }
    async listFiles(options) {
        var _a;
        const video = await this.get(options);
        const files = video.files || [];
        const hlsFiles = ((_a = video.streamingPlaylists[0]) === null || _a === void 0 ? void 0 : _a.files) || [];
        return files.concat(hlsFiles);
    }
    listMyVideos(options = {}) {
        const path = '/api/v1/users/me/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: pick(options, ['start', 'count', 'sort', 'search', 'isLive', 'channelId', 'autoTagOneOf']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listMySubscriptionVideos(options = {}) {
        const { sort = '-createdAt' } = options;
        const path = '/api/v1/users/me/subscriptions/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ sort }, this.buildListQuery(options)), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    list(options = {}) {
        const path = '/api/v1/videos';
        const query = this.buildListQuery(options);
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ sort: 'name' }, query), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listWithToken(options = {}) {
        return this.list(Object.assign(Object.assign({}, options), { token: this.buildCommonRequestToken(Object.assign(Object.assign({}, options), { implicitToken: true })) }));
    }
    listAllForAdmin(options = {}) {
        const include = VideoInclude.NOT_PUBLISHED_STATE | VideoInclude.BLACKLISTED | VideoInclude.BLOCKED_OWNER | VideoInclude.AUTOMATIC_TAGS;
        const nsfw = 'both';
        const privacyOneOf = getAllPrivacies();
        return this.list(Object.assign(Object.assign({ include,
            nsfw,
            privacyOneOf }, options), { token: this.buildCommonRequestToken(Object.assign(Object.assign({}, options), { implicitToken: true })) }));
    }
    listByAccount(options) {
        const { handle, search } = options;
        const path = '/api/v1/accounts/' + handle + '/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ search }, this.buildListQuery(options)), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listByChannel(options) {
        const { handle } = options;
        const path = '/api/v1/video-channels/' + handle + '/videos';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: this.buildListQuery(options), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async find(options) {
        const { data } = await this.list(options);
        return data.find(v => v.name === options.name);
    }
    async findFull(options) {
        const { uuid } = await this.find(options);
        return this.get({ id: uuid });
    }
    update(options) {
        const { id, attributes = {} } = options;
        const path = '/api/v1/videos/' + id;
        if (attributes.thumbnailfile || attributes.previewfile) {
            const attaches = {};
            if (attributes.thumbnailfile)
                attaches.thumbnailfile = attributes.thumbnailfile;
            if (attributes.previewfile)
                attaches.previewfile = attributes.previewfile;
            return this.putUploadRequest(Object.assign(Object.assign({}, options), { path, fields: options.attributes, attaches: {
                    thumbnailfile: attributes.thumbnailfile,
                    previewfile: attributes.previewfile
                }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
        }
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: options.attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    remove(options) {
        const path = '/api/v1/videos/' + options.id;
        return unwrapBody(this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 })));
    }
    async removeAll() {
        const { data } = await this.list();
        for (const v of data) {
            await this.remove({ id: v.id });
        }
    }
    async upload(options = {}) {
        const { mode = 'legacy', waitTorrentGeneration = true } = options;
        let defaultChannelId = 1;
        try {
            const { videoChannels } = await this.server.users.getMyInfo({ token: options.token });
            defaultChannelId = videoChannels[0].id;
        }
        catch (e) { }
        const attributes = Object.assign({ name: 'my super video', category: 5, licence: 4, language: 'zh', channelId: defaultChannelId, nsfw: true, waitTranscoding: false, description: 'my super description', support: 'my super support text', tags: ['tag'], privacy: VideoPrivacy.PUBLIC, commentsPolicy: VideoCommentPolicy.ENABLED, downloadEnabled: true, fixture: 'video_short.webm' }, options.attributes);
        const created = mode === 'legacy'
            ? await this.buildLegacyUpload(Object.assign(Object.assign({}, options), { attributes }))
            : await this.buildResumeVideoUpload(Object.assign(Object.assign({}, options), { path: '/api/v1/videos/upload-resumable', fixture: attributes.fixture, attaches: this.buildUploadAttaches(attributes, false), fields: this.buildUploadFields(attributes) }));
        const expectedStatus = this.buildExpectedStatus(Object.assign(Object.assign({}, options), { defaultExpectedStatus: HttpStatusCode.OK_200 }));
        if (expectedStatus === HttpStatusCode.OK_200 && waitTorrentGeneration) {
            let video;
            do {
                video = await this.getWithToken(Object.assign(Object.assign({}, options), { id: created.uuid }));
                await wait(50);
            } while (!video.files[0].torrentUrl);
        }
        return created;
    }
    async buildLegacyUpload(options) {
        const path = '/api/v1/videos/upload';
        return unwrapBody(this.postUploadRequest(Object.assign(Object.assign({}, options), { path, fields: this.buildUploadFields(options.attributes), attaches: this.buildUploadAttaches(options.attributes, true), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }))).then(body => body.video || body);
    }
    quickUpload(options) {
        const attributes = { name: options.name };
        if (options.nsfw)
            attributes.nsfw = options.nsfw;
        if (options.privacy)
            attributes.privacy = options.privacy;
        if (options.fixture)
            attributes.fixture = options.fixture;
        if (options.videoPasswords)
            attributes.videoPasswords = options.videoPasswords;
        if (options.channelId)
            attributes.channelId = options.channelId;
        return this.upload(Object.assign(Object.assign({}, options), { attributes }));
    }
    async randomUpload(options = {}) {
        const { wait = true, additionalParams } = options;
        const prefixName = (additionalParams === null || additionalParams === void 0 ? void 0 : additionalParams.prefixName) || '';
        const name = prefixName + buildUUID();
        const attributes = Object.assign({ name }, additionalParams);
        const result = await this.upload(Object.assign(Object.assign({}, options), { attributes }));
        if (wait)
            await waitJobs([this.server]);
        return Object.assign(Object.assign({}, result), { name });
    }
    replaceSourceFile(options) {
        return this.buildResumeUpload(Object.assign(Object.assign({}, options), { path: '/api/v1/videos/' + options.videoId + '/source/replace-resumable', fixture: options.fixture }));
    }
    removeHLSPlaylist(options) {
        const path = '/api/v1/videos/' + options.videoId + '/hls';
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeHLSFile(options) {
        const path = '/api/v1/videos/' + options.videoId + '/hls/' + options.fileId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeAllWebVideoFiles(options) {
        const path = '/api/v1/videos/' + options.videoId + '/web-videos';
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    removeWebVideoFile(options) {
        const path = '/api/v1/videos/' + options.videoId + '/web-videos/' + options.fileId;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    runTranscoding(options) {
        const path = '/api/v1/videos/' + options.videoId + '/transcoding';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['transcodingType', 'forceTranscoding']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    buildListQuery(options) {
        return pick(options, [
            'start',
            'count',
            'sort',
            'nsfw',
            'isLive',
            'categoryOneOf',
            'licenceOneOf',
            'languageOneOf',
            'privacyOneOf',
            'tagsOneOf',
            'tagsAllOf',
            'isLocal',
            'include',
            'skipCount',
            'autoTagOneOf'
        ]);
    }
    buildUploadFields(attributes) {
        return omit(attributes, ['fixture', 'thumbnailfile', 'previewfile']);
    }
    buildUploadAttaches(attributes, includeFixture) {
        const attaches = {};
        for (const key of ['thumbnailfile', 'previewfile']) {
            if (attributes[key])
                attaches[key] = buildAbsoluteFixturePath(attributes[key]);
        }
        if (includeFixture && attributes.fixture)
            attaches.videofile = buildAbsoluteFixturePath(attributes.fixture);
        return attaches;
    }
    sendResumableVideoChunks(options) {
        return super.sendResumableChunks(options);
    }
    async buildResumeVideoUpload(options) {
        const result = await super.buildResumeUpload(options);
        return (result === null || result === void 0 ? void 0 : result.video) || result;
    }
    prepareVideoResumableUpload(options) {
        return super.prepareResumableUpload(options);
    }
    endVideoResumableUpload(options) {
        return super.endResumableUpload(options);
    }
    generateDownload(options) {
        const { videoFileIds, videoId, query = {} } = options;
        const path = '/download/videos/generate/' + videoId;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ videoFileIds }, query), responseType: 'arraybuffer', implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=videos-command.js.map