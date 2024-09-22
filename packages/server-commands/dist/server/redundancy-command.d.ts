import { ResultList, VideoRedundanciesTarget, VideoRedundancy } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class RedundancyCommand extends AbstractCommand {
    updateRedundancy(options: OverrideCommandOptions & {
        host: string;
        redundancyAllowed: boolean;
    }): import("supertest").Test;
    listVideos(options: OverrideCommandOptions & {
        target: VideoRedundanciesTarget;
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<VideoRedundancy>>;
    addVideo(options: OverrideCommandOptions & {
        videoId: number;
    }): import("supertest").Test;
    removeVideo(options: OverrideCommandOptions & {
        redundancyId: number;
    }): import("supertest").Test;
}
//# sourceMappingURL=redundancy-command.d.ts.map