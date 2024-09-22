import express from 'express';
declare const videoImportAddValidator: (import("express-validator").ValidationChain | import("../../../types/express-handler.js").ExpressPromiseHandler)[];
declare const getMyVideoImportsValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const videoImportDeleteValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoImportCancelValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export { videoImportAddValidator, videoImportCancelValidator, videoImportDeleteValidator, getMyVideoImportsValidator };
//# sourceMappingURL=video-imports.d.ts.map