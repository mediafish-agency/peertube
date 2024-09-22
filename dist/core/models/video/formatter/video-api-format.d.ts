import { Video, VideoDetails, VideoFile, VideosCommonQueryAfterSanitize, VideoStreamingPlaylist } from '@peertube/peertube-models';
import { MStreamingPlaylistRedundanciesOpt, MVideoFormattable, MVideoFormattableDetails } from '../../../types/models/index.js';
import { MVideoFileRedundanciesOpt } from '../../../types/models/video/video-file.js';
export type VideoFormattingJSONOptions = {
    completeDescription?: boolean;
    additionalAttributes?: {
        state?: boolean;
        waitTranscoding?: boolean;
        scheduledUpdate?: boolean;
        blacklistInfo?: boolean;
        files?: boolean;
        source?: boolean;
        blockedOwner?: boolean;
        automaticTags?: boolean;
    };
};
export declare function guessAdditionalAttributesFromQuery(query: VideosCommonQueryAfterSanitize): VideoFormattingJSONOptions;
export declare function videoModelToFormattedJSON(video: MVideoFormattable, options?: VideoFormattingJSONOptions): Video;
export declare function videoModelToFormattedDetailsJSON(video: MVideoFormattableDetails): VideoDetails;
export declare function streamingPlaylistsModelToFormattedJSON(video: MVideoFormattable, playlists: MStreamingPlaylistRedundanciesOpt[]): VideoStreamingPlaylist[];
export declare function videoFilesModelToFormattedJSON(video: MVideoFormattable, videoFiles: MVideoFileRedundanciesOpt[], options?: {
    includeMagnet?: boolean;
}): VideoFile[];
export declare function getCategoryLabel(id: number): any;
export declare function getLicenceLabel(id: number): any;
export declare function getLanguageLabel(id: string): string;
export declare function getPrivacyLabel(id: number): any;
export declare function getStateLabel(id: number): any;
//# sourceMappingURL=video-api-format.d.ts.map