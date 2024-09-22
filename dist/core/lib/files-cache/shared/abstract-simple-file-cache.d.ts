type GetFilePathResult = {
    isOwned: boolean;
    path: string;
    downloadName?: string;
} | undefined;
export declare abstract class AbstractSimpleFileCache<T> {
    getFilePath: (params: T) => Promise<GetFilePathResult>;
    abstract getFilePathImpl(params: T): Promise<GetFilePathResult>;
    protected abstract loadRemoteFile(key: string): Promise<GetFilePathResult>;
    init(max: number, maxAge: number): void;
}
export {};
//# sourceMappingURL=abstract-simple-file-cache.d.ts.map