import { MUserImport } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
import { UserModel } from './user.js';
import type { UserImportResultSummary, UserImportStateType } from '@peertube/peertube-models';
export declare class UserImportModel extends SequelizeModel<UserImportModel> {
    createdAt: Date;
    updatedAt: Date;
    filename: string;
    state: UserImportStateType;
    error: string;
    resultSummary: UserImportResultSummary;
    userId: number;
    User: Awaited<UserModel>;
    static load(id: number | string): Promise<MUserImport>;
    static loadLatestByUserId(userId: number): Promise<MUserImport>;
    generateAndSetFilename(): void;
    toFormattedJSON(): {
        id: number;
        state: {
            id: UserImportStateType;
            label: string;
        };
        createdAt: string;
    };
}
//# sourceMappingURL=user-import.d.ts.map