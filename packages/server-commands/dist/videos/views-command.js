import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class ViewsCommand extends AbstractCommand {
    view(options) {
        const { id, xForwardedFor, viewEvent, currentTime, sessionId } = options;
        const path = '/api/v1/videos/' + id + '/views';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path,
            xForwardedFor, fields: {
                currentTime,
                viewEvent,
                sessionId
            }, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async simulateView(options) {
        await this.view(Object.assign(Object.assign({}, options), { currentTime: 0 }));
        await this.view(Object.assign(Object.assign({}, options), { currentTime: 5 }));
    }
    async simulateViewer(options) {
        let viewEvent = 'seek';
        for (const currentTime of options.currentTimes) {
            await this.view(Object.assign(Object.assign({}, options), { currentTime, viewEvent }));
            viewEvent = undefined;
        }
    }
}
//# sourceMappingURL=views-command.js.map