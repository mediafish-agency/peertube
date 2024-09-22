import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ContactFormCommand extends AbstractCommand {
    send(options: OverrideCommandOptions & {
        fromEmail: string;
        fromName: string;
        subject: string;
        body: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=contact-form-command.d.ts.map