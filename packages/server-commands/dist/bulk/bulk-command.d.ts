import { BulkRemoveCommentsOfBody } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class BulkCommand extends AbstractCommand {
    removeCommentsOf(options: OverrideCommandOptions & {
        attributes: BulkRemoveCommentsOfBody;
    }): import("supertest").Test;
}
//# sourceMappingURL=bulk-command.d.ts.map