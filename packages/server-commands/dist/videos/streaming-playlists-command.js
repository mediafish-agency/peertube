import { wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody, unwrapBodyOrDecodeToJSON, unwrapTextOrDecode } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class StreamingPlaylistsCommand extends AbstractCommand {
    async get(options) {
        const { videoFileToken, reinjectVideoFileToken, expectedStatus, withRetry = false, currentRetry = 1 } = options;
        try {
            const result = await unwrapTextOrDecode(this.getRawRequest(Object.assign(Object.assign({}, options), { url: options.url, query: {
                    videoFileToken,
                    reinjectVideoFileToken
                }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
            if (!result && (!expectedStatus || expectedStatus === HttpStatusCode.OK_200)) {
                throw new Error('Empty result');
            }
            return result;
        }
        catch (err) {
            if (!withRetry || currentRetry > 10)
                throw err;
            await wait(250);
            return this.get(Object.assign(Object.assign({}, options), { withRetry, currentRetry: currentRetry + 1 }));
        }
    }
    async getFragmentedSegment(options) {
        const { withRetry = false, currentRetry = 1 } = options;
        try {
            const result = await unwrapBody(this.getRawRequest(Object.assign(Object.assign({}, options), { url: options.url, range: options.range, implicitToken: false, responseType: 'application/octet-stream', defaultExpectedStatus: HttpStatusCode.OK_200 })));
            return result;
        }
        catch (err) {
            if (!withRetry || currentRetry > 10)
                throw err;
            await wait(250);
            return this.getFragmentedSegment(Object.assign(Object.assign({}, options), { withRetry, currentRetry: currentRetry + 1 }));
        }
    }
    async getSegmentSha256(options) {
        const { withRetry = false, currentRetry = 1 } = options;
        try {
            const result = await unwrapBodyOrDecodeToJSON(this.getRawRequest(Object.assign(Object.assign({}, options), { url: options.url, contentType: 'application/json', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 })));
            return result;
        }
        catch (err) {
            if (!withRetry || currentRetry > 10)
                throw err;
            await wait(250);
            return this.getSegmentSha256(Object.assign(Object.assign({}, options), { withRetry, currentRetry: currentRetry + 1 }));
        }
    }
}
//# sourceMappingURL=streaming-playlists-command.js.map