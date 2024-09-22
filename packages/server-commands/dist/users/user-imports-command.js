import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class UserImportsCommand extends AbstractCommand {
    importArchive(options) {
        return this.buildResumeUpload(Object.assign(Object.assign({}, options), { path: `/api/v1/users/${options.userId}/imports/import-resumable`, fixture: options.fixture, completedExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getLatestImport(options) {
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: `/api/v1/users/${options.userId}/imports/latest`, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=user-imports-command.js.map