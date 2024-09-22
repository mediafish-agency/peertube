import { VideoIncludeType } from '../videos/video-include.enum.js';
import { VideoPrivacyType } from '../videos/video-privacy.enum.js';
import { BooleanBothQuery } from './boolean-both-query.model.js';
export interface VideosCommonQuery {
    start?: number;
    count?: number;
    sort?: string;
    nsfw?: BooleanBothQuery;
    isLive?: boolean;
    isLocal?: boolean;
    include?: VideoIncludeType;
    categoryOneOf?: number[];
    licenceOneOf?: number[];
    languageOneOf?: string[];
    tagsOneOf?: string[];
    tagsAllOf?: string[];
    hasHLSFiles?: boolean;
    hasWebtorrentFiles?: boolean;
    hasWebVideoFiles?: boolean;
    skipCount?: boolean;
    search?: string;
    excludeAlreadyWatched?: boolean;
    autoTagOneOf?: string[];
    privacyOneOf?: VideoPrivacyType[];
}
export interface VideosCommonQueryAfterSanitize extends VideosCommonQuery {
    start: number;
    count: number;
    sort: string;
}
//# sourceMappingURL=videos-common-query.model.d.ts.map