import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class BulkCommand extends AbstractCommand {
    removeCommentsOf(options) {
        const { attributes } = options;
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path: '/api/v1/bulk/remove-comments-of', fields: attributes, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=bulk-command.js.map