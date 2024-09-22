import { ResultList, VideoChangeOwnership } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ChangeOwnershipCommand extends AbstractCommand {
    create(options: OverrideCommandOptions & {
        videoId: number | string;
        username: string;
    }): import("supertest").Test;
    list(options?: OverrideCommandOptions): Promise<ResultList<VideoChangeOwnership>>;
    accept(options: OverrideCommandOptions & {
        ownershipId: number;
        channelId: number;
    }): import("supertest").Test;
    refuse(options: OverrideCommandOptions & {
        ownershipId: number;
    }): import("supertest").Test;
}
//# sourceMappingURL=change-ownership-command.d.ts.map