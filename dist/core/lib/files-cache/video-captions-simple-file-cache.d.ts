import { AbstractSimpleFileCache } from './shared/abstract-simple-file-cache.js';
declare class VideoCaptionsSimpleFileCache extends AbstractSimpleFileCache<string> {
    private static instance;
    private constructor();
    static get Instance(): VideoCaptionsSimpleFileCache;
    getFilePathImpl(filename: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
    protected loadRemoteFile(key: string): Promise<{
        isOwned: boolean;
        path: string;
    }>;
}
export { VideoCaptionsSimpleFileCache };
//# sourceMappingURL=video-captions-simple-file-cache.d.ts.map