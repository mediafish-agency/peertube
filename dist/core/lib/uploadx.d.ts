import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { FileQuery, Uploadx, Metadata as UploadXMetadata } from '@uploadx/core';
export declare const uploadx: Uploadx<Readonly<import("@uploadx/core").File>>;
export declare function safeUploadXCleanup(file: FileQuery): void;
export declare function buildUploadXFile<T extends UploadXMetadata>(reqBody: T): T & {
    path: string;
    filename: any;
};
export declare function setupUploadResumableRoutes(options: {
    router: express.Router;
    routePath: string;
    uploadInitBeforeMiddlewares?: RequestHandler[];
    uploadInitAfterMiddlewares?: RequestHandler[];
    uploadedMiddlewares?: ((req: Request<any>, res: Response, next: NextFunction) => void)[];
    uploadedController: (req: Request<any>, res: Response, next: NextFunction) => void;
    uploadDeleteMiddlewares?: RequestHandler[];
}): void;
//# sourceMappingURL=uploadx.d.ts.map