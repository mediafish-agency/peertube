import { CustomPage } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class CustomPagesCommand extends AbstractCommand {
    getInstanceHomepage(options?: OverrideCommandOptions): Promise<CustomPage>;
    updateInstanceHomepage(options: OverrideCommandOptions & {
        content: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=custom-pages-command.d.ts.map