import { AbstractSimpleFileCache } from './shared/abstract-simple-file-cache.js';
declare class VideoStoryboardsSimpleFileCache extends AbstractSimpleFileCache<string> {
    private static instance;
    private constructor();
    static get Instance(): VideoStoryboardsSimpleFileCache;
    getFilePathImpl(filename: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
    protected loadRemoteFile(key: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
}
export { VideoStoryboardsSimpleFileCache };
//# sourceMappingURL=video-storyboards-simple-file-cache.d.ts.map