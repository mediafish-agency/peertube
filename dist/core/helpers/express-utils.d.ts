import express, { RequestHandler } from 'express';
declare function buildNSFWFilter(res?: express.Response, paramNSFW?: string): boolean;
declare function cleanUpReqFiles(req: express.Request): void;
declare function getHostWithPort(host: string): string;
declare function createReqFiles(fieldNames: string[], mimeTypes: {
    [id: string]: string | string[];
}, destination?: string): RequestHandler;
declare function createAnyReqFiles(mimeTypes: {
    [id: string]: string | string[];
}, fileFilter: (req: express.Request, file: Express.Multer.File, cb: (err: Error, result: boolean) => void) => void): RequestHandler;
declare function isUserAbleToSearchRemoteURI(res: express.Response): boolean;
declare function getCountVideos(req: express.Request): boolean;
export { buildNSFWFilter, getHostWithPort, createAnyReqFiles, isUserAbleToSearchRemoteURI, createReqFiles, cleanUpReqFiles, getCountVideos };
//# sourceMappingURL=express-utils.d.ts.map