import { Model } from 'sequelize-typescript';
type ModelCacheType = 'server-account' | 'local-actor-name' | 'local-actor-url' | 'load-video-immutable-id' | 'load-video-immutable-url';
type DeleteKey = 'video';
declare class ModelCache {
    private static instance;
    private readonly localCache;
    private readonly deleteIds;
    private constructor();
    static get Instance(): ModelCache;
    doCache<T extends Model>(options: {
        cacheType: ModelCacheType;
        key: string;
        fun: () => Promise<T>;
        whitelist?: () => boolean;
        deleteKey?: DeleteKey;
    }): Promise<T>;
    invalidateCache(deleteKey: DeleteKey, modelId: number): void;
    clearCache(cacheType: ModelCacheType): void;
}
export { ModelCache };
//# sourceMappingURL=model-cache.d.ts.map