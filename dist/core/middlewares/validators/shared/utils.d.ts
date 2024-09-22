import express from 'express';
declare function areValidationErrors(req: express.Request, res: express.Response, options?: {
    omitLog?: boolean;
    omitBodyLog?: boolean;
    tags?: (number | string)[];
}): boolean;
declare function isValidVideoIdParam(paramName: string): import("express-validator").ValidationChain;
declare function isValidPlaylistIdParam(paramName: string): import("express-validator").ValidationChain;
export { areValidationErrors, isValidVideoIdParam, isValidPlaylistIdParam };
//# sourceMappingURL=utils.d.ts.map