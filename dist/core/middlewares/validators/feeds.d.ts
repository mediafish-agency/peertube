import express from 'express';
declare const feedsFormatValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare function setFeedFormatContentType(req: express.Request, res: express.Response, next: express.NextFunction): void;
declare function setFeedPodcastContentType(req: express.Request, res: express.Response, next: express.NextFunction): void;
declare const feedsAccountOrChannelFiltersValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoFeedsPodcastValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoSubscriptionFeedsValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoCommentsFeedsValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export { feedsFormatValidator, setFeedFormatContentType, setFeedPodcastContentType, feedsAccountOrChannelFiltersValidator, videoFeedsPodcastValidator, videoSubscriptionFeedsValidator, videoCommentsFeedsValidator };
//# sourceMappingURL=feeds.d.ts.map