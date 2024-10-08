import { pick } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { buildAbsoluteFixturePath } from '@peertube/peertube-node-utils';
import { AbstractCommand } from '../shared/index.js';
export class CaptionsCommand extends AbstractCommand {
    add(options) {
        const { videoId, language, fixture, mimeType } = options;
        const path = '/api/v1/videos/' + videoId + '/captions/' + language;
        const captionfile = buildAbsoluteFixturePath(fixture);
        const captionfileAttach = mimeType
            ? [captionfile, { contentType: mimeType }]
            : captionfile;
        return this.putUploadRequest(Object.assign(Object.assign({}, options), { path, fields: {}, attaches: {
                captionfile: captionfileAttach
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    runGenerate(options) {
        const { videoId } = options;
        const path = '/api/v1/videos/' + videoId + '/captions/generate';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: pick(options, ['forceTranscription']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    list(options) {
        const { videoId, videoPassword } = options;
        const path = '/api/v1/videos/' + videoId + '/captions';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, headers: this.buildVideoPasswordHeader(videoPassword), implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    delete(options) {
        const { videoId, language } = options;
        const path = '/api/v1/videos/' + videoId + '/captions/' + language;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=captions-command.js.map