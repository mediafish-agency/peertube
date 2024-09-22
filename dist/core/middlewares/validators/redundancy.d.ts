import express from 'express';
declare const videoFileRedundancyGetValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any>>))[];
declare const videoPlaylistRedundancyGetValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any>>))[];
declare const updateServerRedundancyValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const listVideoRedundanciesValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const addVideoRedundancyValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const removeVideoRedundancyValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export { videoFileRedundancyGetValidator, videoPlaylistRedundancyGetValidator, updateServerRedundancyValidator, listVideoRedundanciesValidator, addVideoRedundancyValidator, removeVideoRedundancyValidator };
//# sourceMappingURL=redundancy.d.ts.map