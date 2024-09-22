import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class StoryboardCommand extends AbstractCommand {
    list(options) {
        const path = '/api/v1/videos/' + options.id + '/storyboards';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=storyboard-command.js.map