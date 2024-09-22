import express from 'express';
import { ApiCache, APICacheOptions } from './shared/index.js';
export declare function cacheRoute(duration: string): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export declare function cacheRouteFactory(options?: APICacheOptions): {
    instance: ApiCache;
    middleware: (strDuration: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
};
export declare function buildPodcastGroupsCache(options: {
    channelId: number;
}): string;
export declare function buildAPVideoChaptersGroupsCache(options: {
    videoId: number | string;
}): string;
export declare const videoFeedsPodcastSetCacheKey: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const apVideoChaptersSetCacheKey: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
//# sourceMappingURL=cache.d.ts.map