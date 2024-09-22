import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ServicesCommand extends AbstractCommand {
    getOEmbed(options: OverrideCommandOptions & {
        oembedUrl: string;
        format?: string;
        maxHeight?: number;
        maxWidth?: number;
    }): import("supertest").Test;
}
//# sourceMappingURL=services-command.d.ts.map