import { VideoChannelsSearchQueryAfterSanitize, VideoPlaylistsSearchQueryAfterSanitize, VideosCommonQueryAfterSanitize, VideosSearchQueryAfterSanitize } from '@peertube/peertube-models';
declare function pickCommonVideoQuery(query: VideosCommonQueryAfterSanitize): Pick<VideosCommonQueryAfterSanitize, "sort" | "nsfw" | "isLive" | "hasWebVideoFiles" | "count" | "search" | "include" | "start" | "categoryOneOf" | "licenceOneOf" | "languageOneOf" | "autoTagOneOf" | "tagsOneOf" | "tagsAllOf" | "privacyOneOf" | "isLocal" | "hasHLSFiles" | "hasWebtorrentFiles" | "excludeAlreadyWatched" | "skipCount">;
declare function pickSearchVideoQuery(query: VideosSearchQueryAfterSanitize): {
    startDate?: string;
    endDate?: string;
    host?: string;
    uuids?: string[];
    originallyPublishedStartDate?: string;
    originallyPublishedEndDate?: string;
    durationMin?: number;
    durationMax?: number;
    searchTarget?: import("@peertube/peertube-models").SearchTargetType;
    sort: string;
    nsfw?: import("@peertube/peertube-models").BooleanBothQuery;
    isLive?: boolean;
    hasWebVideoFiles?: boolean;
    count: number;
    search?: string;
    include?: import("@peertube/peertube-models").VideoIncludeType;
    start: number;
    categoryOneOf?: number[];
    licenceOneOf?: number[];
    languageOneOf?: string[];
    autoTagOneOf?: string[];
    tagsOneOf?: string[];
    tagsAllOf?: string[];
    privacyOneOf?: import("@peertube/peertube-models").VideoPrivacyType[];
    isLocal?: boolean;
    hasHLSFiles?: boolean;
    hasWebtorrentFiles?: boolean;
    excludeAlreadyWatched?: boolean;
    skipCount?: boolean;
};
declare function pickSearchChannelQuery(query: VideoChannelsSearchQueryAfterSanitize): Pick<VideoChannelsSearchQueryAfterSanitize, "sort" | "host" | "count" | "search" | "start" | "handles" | "searchTarget">;
declare function pickSearchPlaylistQuery(query: VideoPlaylistsSearchQueryAfterSanitize): Pick<VideoPlaylistsSearchQueryAfterSanitize, "sort" | "host" | "count" | "search" | "start" | "uuids" | "searchTarget">;
export { pickCommonVideoQuery, pickSearchVideoQuery, pickSearchPlaylistQuery, pickSearchChannelQuery };
//# sourceMappingURL=query.d.ts.map