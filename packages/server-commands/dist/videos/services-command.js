import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class ServicesCommand extends AbstractCommand {
    getOEmbed(options) {
        const path = '/services/oembed';
        const query = {
            url: options.oembedUrl,
            format: options.format,
            maxheight: options.maxHeight,
            maxwidth: options.maxWidth
        };
        return this.getRequest(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
}
//# sourceMappingURL=services-command.js.map