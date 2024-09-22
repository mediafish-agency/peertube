import { wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode, UserExportState } from '@peertube/peertube-models';
import { writeFile } from 'fs/promises';
import { makeRawRequest, unwrapBody } from '../requests/requests.js';
import { AbstractCommand } from '../shared/index.js';
export class UserExportsCommand extends AbstractCommand {
    request(options) {
        const { userId, withVideoFiles } = options;
        return unwrapBody(this.postBodyRequest(Object.assign(Object.assign({}, options), { path: `/api/v1/users/${userId}/exports/request`, fields: { withVideoFiles }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
    }
    async waitForCreation(options) {
        const { userId } = options;
        while (true) {
            const { data } = await this.list(Object.assign(Object.assign({}, options), { userId }));
            if (data.some(e => e.state.id === UserExportState.COMPLETED))
                break;
            await wait(250);
        }
    }
    list(options) {
        const { userId } = options;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: `/api/v1/users/${userId}/exports`, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async downloadLatestArchive(options) {
        const { data } = await this.list(options);
        const res = await makeRawRequest({
            url: data[0].privateDownloadUrl,
            responseType: 'arraybuffer',
            redirects: 1,
            expectedStatus: HttpStatusCode.OK_200
        });
        await writeFile(options.destination, res.body);
    }
    async deleteAllArchives(options) {
        const { data } = await this.list(options);
        for (const { id } of data) {
            await this.delete(Object.assign(Object.assign({}, options), { exportId: id }));
        }
    }
    delete(options) {
        const { userId, exportId } = options;
        return this.deleteRequest(Object.assign(Object.assign({}, options), { path: `/api/v1/users/${userId}/exports/${exportId}`, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=user-exports-command.js.map