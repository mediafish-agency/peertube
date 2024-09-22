import { Awaitable } from '@peertube/peertube-typescript-utils';
import { MUserDefault } from '../../../types/models/user/user.js';
export declare abstract class AbstractUserImporter<ROOT_OBJECT, OBJECT extends {
    archiveFiles?: Record<string, string | Record<string, string>>;
}, SANITIZED_OBJECT> {
    protected user: MUserDefault;
    protected extractedDirectory: string;
    protected jsonFilePath: string;
    constructor(options: {
        user: MUserDefault;
        extractedDirectory: string;
        jsonFilePath: string;
    });
    getJSONFilePath(): string;
    protected getSafeArchivePathOrThrow(path: string): string;
    protected cleanupImportedStaticFilePaths(archiveFiles: Record<string, string | Record<string, string>>): Promise<void>;
    protected isFileValidOrLog(filePath: string, maxSize: number): Promise<boolean>;
    import(): Promise<{
        duplicates: number;
        success: number;
        errors: number;
    }>;
    protected abstract getImportObjects(object: ROOT_OBJECT): OBJECT[];
    protected abstract sanitize(object: OBJECT): SANITIZED_OBJECT | undefined;
    protected abstract importObject(object: SANITIZED_OBJECT): Awaitable<{
        duplicate: boolean;
    }>;
}
//# sourceMappingURL=abstract-user-importer.d.ts.map