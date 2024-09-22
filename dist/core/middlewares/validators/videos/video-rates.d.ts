import express from 'express';
import { VideoRateType } from '@peertube/peertube-models';
declare const videoUpdateRateValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const getAccountVideoRateValidatorFactory: (rateType: VideoRateType) => (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoRatingValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export { videoUpdateRateValidator, getAccountVideoRateValidatorFactory, videoRatingValidator };
//# sourceMappingURL=video-rates.d.ts.map