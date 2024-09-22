import { MStreamingPlaylistVideo, MUserExport, MVideoFile } from '../../types/models/index.js';
import { MVideoSource } from '../../types/models/video/video-source.js';
export declare function generateWebVideoPresignedUrl(options: {
    file: MVideoFile;
    downloadFilename: string;
}): Promise<string>;
export declare function generateHLSFilePresignedUrl(options: {
    streamingPlaylist: MStreamingPlaylistVideo;
    file: MVideoFile;
    downloadFilename: string;
}): Promise<string>;
export declare function generateUserExportPresignedUrl(options: {
    userExport: MUserExport;
    downloadFilename: string;
}): Promise<string>;
export declare function generateOriginalFilePresignedUrl(options: {
    videoSource: MVideoSource;
    downloadFilename: string;
}): Promise<string>;
//# sourceMappingURL=pre-signed-urls.d.ts.map