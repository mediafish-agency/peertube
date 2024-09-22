import { MOAuthTokenUser } from '../../types/models/index.js';
export declare class TokensCache {
    private static instance;
    private readonly accessTokenCache;
    private readonly userHavingToken;
    private constructor();
    static get Instance(): TokensCache;
    hasToken(token: string): boolean;
    getByToken(token: string): MOAuthTokenUser;
    setToken(token: MOAuthTokenUser): void;
    deleteUserToken(userId: number): void;
    clearCacheByUserId(userId: number): void;
    clearCacheByToken(token: string): void;
}
//# sourceMappingURL=tokens-cache.d.ts.map