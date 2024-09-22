import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ServersCommand extends AbstractCommand {
    static flushTests(internalServerNumber: number): Promise<void>;
    ping(options?: OverrideCommandOptions): Promise<unknown>;
    cleanupTests(): Promise<any>[];
    waitUntilLog(str: string, count?: number, strictCount?: boolean): Promise<void>;
    buildDirectory(directory: string): string;
    countFiles(directory: string): Promise<number>;
    buildWebVideoFilePath(fileUrl: string): string;
    buildFragmentedFilePath(videoUUID: string, fileUrl: string): string;
    getLogContent(): Promise<Buffer>;
}
//# sourceMappingURL=servers-command.d.ts.map