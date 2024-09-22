import express from 'express';
import { HttpStatusCodeType } from '@peertube/peertube-models';
export interface APICacheOptions {
    headerBlacklist?: string[];
    excludeStatus?: HttpStatusCodeType[];
}
export declare class ApiCache {
    private readonly options;
    private readonly timers;
    private readonly index;
    private groups;
    private readonly seed;
    constructor(options: APICacheOptions);
    buildMiddleware(strDuration: string): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    clearGroupSafe(group: string): void;
    private getCacheKey;
    private shouldCacheResponse;
    private addIndexEntries;
    private filterBlacklistedHeaders;
    private createCacheObject;
    private cacheResponse;
    private accumulateContent;
    private makeResponseCacheable;
    private sendCachedResponse;
    private clear;
}
//# sourceMappingURL=api-cache.d.ts.map