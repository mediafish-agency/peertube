import { Storyboard } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class StoryboardCommand extends AbstractCommand {
    list(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<{
        storyboards: Storyboard[];
    }>;
}
//# sourceMappingURL=storyboard-command.d.ts.map