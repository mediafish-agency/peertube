import { Debug, SendDebugCommand } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class DebugCommand extends AbstractCommand {
    getDebug(options?: OverrideCommandOptions): Promise<Debug>;
    sendCommand(options: OverrideCommandOptions & {
        body: SendDebugCommand;
    }): import("supertest").Test;
}
//# sourceMappingURL=debug-command.d.ts.map