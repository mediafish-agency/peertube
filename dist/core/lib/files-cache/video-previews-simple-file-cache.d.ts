import { AbstractSimpleFileCache } from './shared/abstract-simple-file-cache.js';
declare class VideoPreviewsSimpleFileCache extends AbstractSimpleFileCache<string> {
    private static instance;
    private constructor();
    static get Instance(): VideoPreviewsSimpleFileCache;
    getFilePathImpl(filename: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
    protected loadRemoteFile(key: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
}
export { VideoPreviewsSimpleFileCache };
//# sourceMappingURL=video-previews-simple-file-cache.d.ts.map