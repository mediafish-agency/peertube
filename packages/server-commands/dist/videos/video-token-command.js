import { HttpStatusCode } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class VideoTokenCommand extends AbstractCommand {
    create(options) {
        const { videoId, videoPassword } = options;
        const path = '/api/v1/videos/' + videoId + '/token';
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { headers: this.buildVideoPasswordHeader(videoPassword), path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    async getVideoFileToken(options) {
        const { files } = await this.create(options);
        return files.token;
    }
}
//# sourceMappingURL=video-token-command.js.map