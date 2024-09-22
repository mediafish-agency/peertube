import { ResultList, UserExport, UserExportRequestResult } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class UserExportsCommand extends AbstractCommand {
    request(options: OverrideCommandOptions & {
        userId: number;
        withVideoFiles: boolean;
    }): Promise<UserExportRequestResult>;
    waitForCreation(options: OverrideCommandOptions & {
        userId: number;
    }): Promise<void>;
    list(options: OverrideCommandOptions & {
        userId: number;
    }): Promise<ResultList<UserExport>>;
    downloadLatestArchive(options: OverrideCommandOptions & {
        userId: number;
        destination: string;
    }): Promise<void>;
    deleteAllArchives(options: OverrideCommandOptions & {
        userId: number;
    }): Promise<void>;
    delete(options: OverrideCommandOptions & {
        exportId: number;
        userId: number;
    }): import("supertest").Test;
}
//# sourceMappingURL=user-exports-command.d.ts.map