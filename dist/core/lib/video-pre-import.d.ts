import { VideoImportCreate } from '@peertube/peertube-models';
import { YoutubeDLInfo } from '../helpers/youtube-dl/index.js';
import { VideoImportModel } from '../models/video/video-import.js';
import { FilteredModelAttributes } from '../types/index.js';
import { MChannelAccountDefault, MChannelSync, MThumbnail, MUser, MVideoImportFormattable, MVideoThumbnail } from '../types/models/index.js';
declare class YoutubeDlImportError extends Error {
    code: YoutubeDlImportError.CODE;
    cause?: Error;
    constructor({ message, code }: {
        message: any;
        code: any;
    });
    static fromError(err: Error, code: YoutubeDlImportError.CODE, message?: string): YoutubeDlImportError;
}
declare namespace YoutubeDlImportError {
    enum CODE {
        FETCH_ERROR = 0,
        NOT_ONLY_UNICAST_URL = 1
    }
}
declare function insertFromImportIntoDB(parameters: {
    video: MVideoThumbnail;
    thumbnailModel: MThumbnail;
    previewModel: MThumbnail;
    videoChannel: MChannelAccountDefault;
    tags: string[];
    videoImportAttributes: FilteredModelAttributes<VideoImportModel>;
    user: MUser;
    videoPasswords?: string[];
}): Promise<MVideoImportFormattable>;
declare function buildVideoFromImport({ channelId, importData, importDataOverride, importType }: {
    channelId: number;
    importData: YoutubeDLInfo;
    importDataOverride?: Partial<VideoImportCreate>;
    importType: 'url' | 'torrent';
}): Promise<MVideoThumbnail>;
declare function buildYoutubeDLImport(options: {
    targetUrl: string;
    channel: MChannelAccountDefault;
    user: MUser;
    channelSync?: MChannelSync;
    importDataOverride?: Partial<VideoImportCreate>;
    thumbnailFilePath?: string;
    previewFilePath?: string;
}): Promise<{
    videoImport: MVideoImportFormattable;
    job: {
        type: "video-import";
        payload: import("@peertube/peertube-models").VideoImportYoutubeDLPayload & {
            preventException: boolean;
        };
    };
}>;
export { YoutubeDlImportError, buildVideoFromImport, buildYoutubeDLImport, insertFromImportIntoDB };
//# sourceMappingURL=video-pre-import.d.ts.map