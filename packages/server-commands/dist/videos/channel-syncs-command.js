import { HttpStatusCode } from '@peertube/peertube-models';
import { pick } from '@peertube/peertube-core-utils';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
export class ChannelSyncsCommand extends AbstractCommand {
    listByAccount(options) {
        const { accountName, sort = 'createdAt' } = options;
        const path = `/api/v1/accounts/${accountName}/video-channel-syncs`;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: Object.assign({ sort }, pick(options, ['start', 'count'])), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async create(options) {
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path: ChannelSyncsCommand.API_PATH, fields: options.attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    delete(options) {
        const path = `${ChannelSyncsCommand.API_PATH}/${options.channelSyncId}`;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
ChannelSyncsCommand.API_PATH = '/api/v1/video-channel-syncs';
//# sourceMappingURL=channel-syncs-command.js.map