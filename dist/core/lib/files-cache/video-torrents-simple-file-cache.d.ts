import { AbstractSimpleFileCache } from './shared/abstract-simple-file-cache.js';
declare class VideoTorrentsSimpleFileCache extends AbstractSimpleFileCache<string> {
    private static instance;
    private constructor();
    static get Instance(): VideoTorrentsSimpleFileCache;
    getFilePathImpl(filename: string): Promise<{
        isOwned: boolean;
        path: string;
        downloadName: string;
    }>;
    protected loadRemoteFile(key: string): Promise<{
        isOwned: boolean;
        path: string;
        downloadName: string;
    }>;
    private buildDownloadName;
}
export { VideoTorrentsSimpleFileCache };
//# sourceMappingURL=video-torrents-simple-file-cache.d.ts.map