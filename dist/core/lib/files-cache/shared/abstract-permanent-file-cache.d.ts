import express from 'express';
import { Model } from 'sequelize';
type ImageModel = {
    fileUrl: string;
    filename: string;
    onDisk: boolean;
    isOwned(): boolean;
    getPath(): string;
    save(): Promise<Model>;
};
export declare abstract class AbstractPermanentFileCache<M extends ImageModel> {
    private readonly directory;
    private readonly filenameToPathUnsafeCache;
    protected abstract getImageSize(image: M): {
        width: number;
        height: number;
    };
    protected abstract loadModel(filename: string): Promise<M>;
    constructor(directory: string);
    lazyServe(options: {
        filename: string;
        res: express.Response;
        next: express.NextFunction;
    }): Promise<void | express.Response<any>>;
    private lazyLoadIfNeeded;
    downloadRemoteFile(image: M): Promise<string>;
    private onServeError;
    private downloadImage;
}
export {};
//# sourceMappingURL=abstract-permanent-file-cache.d.ts.map