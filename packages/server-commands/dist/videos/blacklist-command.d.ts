import { ResultList, VideoBlacklist, VideoBlacklistType_Type } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class BlacklistCommand extends AbstractCommand {
    add(options: OverrideCommandOptions & {
        videoId: number | string;
        reason?: string;
        unfederate?: boolean;
    }): import("supertest").Test;
    update(options: OverrideCommandOptions & {
        videoId: number | string;
        reason?: string;
    }): import("supertest").Test;
    remove(options: OverrideCommandOptions & {
        videoId: number | string;
    }): import("supertest").Test;
    list(options?: OverrideCommandOptions & {
        sort?: string;
        type?: VideoBlacklistType_Type;
    }): Promise<ResultList<VideoBlacklist>>;
}
//# sourceMappingURL=blacklist-command.d.ts.map