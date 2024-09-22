import express from 'express';
declare const videoLiveGetValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoLiveAddValidator: (import("express-validator").ValidationChain | import("../../../types/express-handler.js").ExpressPromiseHandler)[];
declare const videoLiveUpdateValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const videoLiveListSessionsValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
declare const videoLiveFindReplaySessionValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export { videoLiveAddValidator, videoLiveUpdateValidator, videoLiveListSessionsValidator, videoLiveFindReplaySessionValidator, videoLiveGetValidator };
//# sourceMappingURL=video-live.d.ts.map