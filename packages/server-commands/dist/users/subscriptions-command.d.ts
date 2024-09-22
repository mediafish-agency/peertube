import { ResultList, VideoChannel } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class SubscriptionsCommand extends AbstractCommand {
    add(options: OverrideCommandOptions & {
        targetUri: string;
    }): import("supertest").Test;
    list(options?: OverrideCommandOptions & {
        sort?: string;
        search?: string;
    }): Promise<ResultList<VideoChannel>>;
    get(options: OverrideCommandOptions & {
        uri: string;
    }): Promise<VideoChannel>;
    remove(options: OverrideCommandOptions & {
        uri: string;
    }): import("supertest").Test;
    exist(options: OverrideCommandOptions & {
        uris: string[];
    }): Promise<{
        [id: string]: boolean;
    }>;
}
//# sourceMappingURL=subscriptions-command.d.ts.map