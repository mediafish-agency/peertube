import { VideosOverview } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class OverviewsCommand extends AbstractCommand {
    getVideos(options: OverrideCommandOptions & {
        page: number;
    }): Promise<VideosOverview>;
}
//# sourceMappingURL=overviews-command.d.ts.map