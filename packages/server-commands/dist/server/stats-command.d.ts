import { ServerStats } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class StatsCommand extends AbstractCommand {
    get(options?: OverrideCommandOptions & {
        useCache?: boolean;
    }): Promise<ServerStats>;
}
//# sourceMappingURL=stats-command.d.ts.map