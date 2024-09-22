import { ResultList, Video } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class HistoryCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        search?: string;
    }): Promise<ResultList<Video>>;
    removeElement(options: OverrideCommandOptions & {
        videoId: number;
    }): import("supertest").Test;
    removeAll(options?: OverrideCommandOptions & {
        beforeDate?: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=history-command.d.ts.map