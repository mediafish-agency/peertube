import { MStreamingPlaylistVideo, MVideo } from '../types/models/index.js';
import { Response } from 'express';
export declare function getVideoWithAttributes(res: Response): import("../types/models/index.js").MVideoFormattableDetails | import("../types/models/index.js").MVideoThumbnailBlacklist;
export declare function extractVideo(videoOrPlaylist: MVideo | MStreamingPlaylistVideo): MVideo;
export declare function getPrivaciesForFederation(): ({
    privacy: 1;
} | {
    privacy: 2;
})[];
export declare function getExtFromMimetype(mimeTypes: {
    [id: string]: string | string[];
}, mimeType: string): string;
export declare function peertubeLicenceToSPDX(licence: number): string;
export declare function spdxToPeertubeLicence(licence: string): number;
//# sourceMappingURL=video.d.ts.map