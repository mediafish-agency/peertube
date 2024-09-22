import { ResultList, VideoPassword } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class VideoPasswordsCommand extends AbstractCommand {
    list(options: OverrideCommandOptions & {
        videoId: number | string;
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<VideoPassword>>;
    updateAll(options: OverrideCommandOptions & {
        videoId: number | string;
        passwords: string[];
    }): import("supertest").Test;
    remove(options: OverrideCommandOptions & {
        id: number;
        videoId: number | string;
    }): import("supertest").Test;
}
//# sourceMappingURL=video-passwords-command.d.ts.map