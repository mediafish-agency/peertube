import { type FileStorageType, type UserExport, type UserExportStateType } from '@peertube/peertube-models';
import { MUserAccountId, MUserExport } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/sequelize-type.js';
import { UserModel } from './user.js';
export declare class UserExportModel extends SequelizeModel<UserExportModel> {
    createdAt: Date;
    updatedAt: Date;
    filename: string;
    withVideoFiles: boolean;
    state: UserExportStateType;
    error: string;
    size: number;
    storage: FileStorageType;
    fileUrl: string;
    userId: number;
    User: Awaited<UserModel>;
    static removeFile(instance: UserExportModel): any;
    static listByUser(user: MUserAccountId): Promise<MUserExport[]>;
    static listExpired(expirationTimeMS: number): Promise<MUserExport[]>;
    static listForApi(options: {
        user: MUserAccountId;
        start: number;
        count: number;
    }): Promise<{
        total: number;
        data: MUserExport[];
    }>;
    static load(id: number | string): Promise<MUserExport>;
    static loadByFilename(filename: string): Promise<MUserExport>;
    static doesOwnedFileExist(filename: string, storage: FileStorageType): Promise<boolean>;
    generateAndSetFilename(): void;
    canBeSafelyRemoved(): boolean;
    generateJWT(): string;
    isJWTValid(jwtToken: string): boolean;
    getFileDownloadUrl(): string;
    toFormattedJSON(this: MUserExport): UserExport;
}
//# sourceMappingURL=user-export.d.ts.map