import { HttpStatusCodeType, UserImport, UserImportUploadResult } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class UserImportsCommand extends AbstractCommand {
    importArchive(options: OverrideCommandOptions & {
        userId: number;
        fixture: string;
        completedExpectedStatus?: HttpStatusCodeType;
    }): Promise<UserImportUploadResult>;
    getLatestImport(options: OverrideCommandOptions & {
        userId: number;
    }): Promise<UserImport>;
}
//# sourceMappingURL=user-imports-command.d.ts.map