import { MUserDefault } from '../../../../types/models/index.js';
import { AbstractNewAbuseMessage } from './abstract-new-abuse-message.js';
export declare class NewAbuseMessageForReporter extends AbstractNewAbuseMessage {
    private reporter;
    prepare(): Promise<void>;
    log(): void;
    getTargetUsers(): MUserDefault[];
    createEmail(to: string): {
        template: string;
        to: string;
        subject: string;
        locals: {
            abuseId: number;
            abuseUrl: string;
            messageAccountName: string;
            messageText: string;
            action: {
                text: string;
                url: string;
            };
        };
    };
}
//# sourceMappingURL=new-abuse-message-for-reporter.d.ts.map