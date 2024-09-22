import { HttpStatusCode } from '@peertube/peertube-models';
import { buildAbsoluteFixturePath, getFileSize } from '@peertube/peertube-node-utils';
import { expect } from 'chai';
import got from 'got';
import { isAbsolute } from 'path';
import { makeDeleteRequest, makeGetRequest, makePostBodyRequest, makePutBodyRequest, makeUploadRequest, unwrapBody, unwrapText } from '../requests/requests.js';
import { createReadStream } from 'fs';
export class AbstractCommand {
    constructor(server) {
        this.server = server;
    }
    getRequestBody(options) {
        return unwrapBody(this.getRequest(options));
    }
    getRequestText(options) {
        return unwrapText(this.getRequest(options));
    }
    getRawRequest(options) {
        const { url, range } = options;
        const { host, protocol, pathname } = new URL(url);
        return this.getRequest(Object.assign(Object.assign({}, options), { token: this.buildCommonRequestToken(options), defaultExpectedStatus: this.buildExpectedStatus(options), url: `${protocol}//${host}`, path: pathname, range }));
    }
    getRequest(options) {
        const { query } = options;
        return makeGetRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { query }));
    }
    deleteRequest(options) {
        const { query, rawQuery } = options;
        return makeDeleteRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { query,
            rawQuery }));
    }
    putBodyRequest(options) {
        const { fields, headers } = options;
        return makePutBodyRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { fields,
            headers }));
    }
    postBodyRequest(options) {
        const { fields, headers } = options;
        return makePostBodyRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { fields,
            headers }));
    }
    postUploadRequest(options) {
        const { fields, attaches } = options;
        return makeUploadRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { method: 'POST', fields,
            attaches }));
    }
    putUploadRequest(options) {
        const { fields, attaches } = options;
        return makeUploadRequest(Object.assign(Object.assign({}, this.buildCommonRequestOptions(options)), { method: 'PUT', fields,
            attaches }));
    }
    updateImageRequest(options) {
        const filePath = isAbsolute(options.fixture)
            ? options.fixture
            : buildAbsoluteFixturePath(options.fixture);
        return this.postUploadRequest(Object.assign(Object.assign({}, options), { fields: {}, attaches: { [options.fieldname]: filePath } }));
    }
    buildCommonRequestOptions(options) {
        const { url, path, redirects, contentType, accept, range, host, headers, requestType, xForwardedFor, responseType } = options;
        return {
            url: url !== null && url !== void 0 ? url : this.server.url,
            path,
            token: this.buildCommonRequestToken(options),
            expectedStatus: this.buildExpectedStatus(options),
            redirects,
            contentType,
            range,
            host,
            accept,
            headers,
            type: requestType,
            responseType,
            xForwardedFor
        };
    }
    buildCommonRequestToken(options) {
        const { token } = options;
        const fallbackToken = options.implicitToken
            ? this.server.accessToken
            : undefined;
        return token !== undefined ? token : fallbackToken;
    }
    buildExpectedStatus(options) {
        const { expectedStatus, defaultExpectedStatus } = options;
        return expectedStatus !== undefined ? expectedStatus : defaultExpectedStatus;
    }
    buildVideoPasswordHeader(videoPassword) {
        return videoPassword !== undefined && videoPassword !== null
            ? { 'x-peertube-video-password': videoPassword }
            : undefined;
    }
    async buildResumeUpload(options) {
        const { path, fixture, expectedStatus = HttpStatusCode.OK_200, completedExpectedStatus } = options;
        let size = 0;
        let videoFilePath;
        let mimetype = 'video/mp4';
        if (fixture) {
            videoFilePath = buildAbsoluteFixturePath(fixture);
            size = await getFileSize(videoFilePath);
            if (videoFilePath.endsWith('.mkv')) {
                mimetype = 'video/x-matroska';
            }
            else if (videoFilePath.endsWith('.webm')) {
                mimetype = 'video/webm';
            }
            else if (videoFilePath.endsWith('.zip')) {
                mimetype = 'application/zip';
            }
        }
        const initializeSessionRes = await this.prepareResumableUpload(Object.assign(Object.assign({}, options), { path, expectedStatus: null, size,
            mimetype }));
        const initStatus = initializeSessionRes.status;
        if (videoFilePath && initStatus === HttpStatusCode.CREATED_201) {
            const locationHeader = initializeSessionRes.header['location'];
            expect(locationHeader).to.not.be.undefined;
            const pathUploadId = locationHeader.split('?')[1];
            const result = await this.sendResumableChunks(Object.assign(Object.assign({}, options), { path,
                pathUploadId,
                videoFilePath,
                size, expectedStatus: completedExpectedStatus }));
            if (result.statusCode === HttpStatusCode.OK_200) {
                await this.endResumableUpload(Object.assign(Object.assign({}, options), { expectedStatus: HttpStatusCode.NO_CONTENT_204, path,
                    pathUploadId }));
            }
            return result.body;
        }
        const expectedInitStatus = expectedStatus === HttpStatusCode.OK_200
            ? HttpStatusCode.CREATED_201
            : expectedStatus;
        expect(initStatus).to.equal(expectedInitStatus);
        return initializeSessionRes.body.video || initializeSessionRes.body;
    }
    async prepareResumableUpload(options) {
        const { path, attaches = {}, fields = {}, originalName, lastModified, fixture, size, mimetype } = options;
        const uploadOptions = Object.assign(Object.assign({}, options), { path, headers: {
                'X-Upload-Content-Type': mimetype,
                'X-Upload-Content-Length': size.toString()
            }, fields: Object.assign({ filename: fixture, originalName,
                lastModified }, fields), attaches, implicitToken: true, defaultExpectedStatus: null });
        if (Object.keys(attaches).length === 0)
            return this.postBodyRequest(uploadOptions);
        return this.postUploadRequest(uploadOptions);
    }
    async sendResumableChunks(options) {
        const { path, pathUploadId, videoFilePath, size, contentLength, contentRangeBuilder, digestBuilder, expectedStatus = HttpStatusCode.OK_200 } = options;
        let start = 0;
        const token = this.buildCommonRequestToken(Object.assign(Object.assign({}, options), { implicitToken: true }));
        const readable = createReadStream(videoFilePath, { highWaterMark: 8 * 1024 });
        const server = this.server;
        return new Promise((resolve, reject) => {
            readable.on('data', async function onData(chunk) {
                try {
                    readable.pause();
                    const byterangeStart = start + chunk.length - 1;
                    const headers = {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/octet-stream',
                        'Content-Range': contentRangeBuilder
                            ? contentRangeBuilder(start, chunk)
                            : `bytes ${start}-${byterangeStart}/${size}`,
                        'Content-Length': contentLength ? contentLength + '' : chunk.length + ''
                    };
                    if (digestBuilder) {
                        Object.assign(headers, { digest: digestBuilder(chunk) });
                    }
                    const res = await got({
                        url: new URL(path + '?' + pathUploadId, server.url).toString(),
                        method: 'put',
                        headers,
                        body: chunk,
                        responseType: 'json',
                        throwHttpErrors: false
                    });
                    start += chunk.length;
                    if (byterangeStart + 1 === size) {
                        if (res.statusCode === expectedStatus) {
                            return resolve(res);
                        }
                        if (res.statusCode !== HttpStatusCode.PERMANENT_REDIRECT_308) {
                            readable.off('data', onData);
                            const message = `Incorrect transient behaviour sending intermediary chunks. Status code is ${res.statusCode} instead of ${expectedStatus}`;
                            return reject(new Error(message));
                        }
                    }
                    readable.resume();
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    endResumableUpload(options) {
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path: options.path, rawQuery: options.pathUploadId, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=abstract-command.js.map