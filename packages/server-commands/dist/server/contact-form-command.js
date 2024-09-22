import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class ContactFormCommand extends AbstractCommand {
    send(options) {
        const path = '/api/v1/server/contact';
        const body = {
            fromEmail: options.fromEmail,
            fromName: options.fromName,
            subject: options.subject,
            body: options.body
        };
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path, fields: body, implicitToken: false, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=contact-form-command.js.map