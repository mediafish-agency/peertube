export declare function buildRateLimiter(options: {
    windowMs: number;
    max: number;
    skipFailedRequests?: boolean;
}): import("express-rate-limit").RateLimitRequestHandler;
export declare const apiRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const activityPubRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rate-limiter.d.ts.map