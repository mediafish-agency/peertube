import { SearchTargetQuery } from './search-target-query.model.js';
import { VideosCommonQuery } from './videos-common-query.model.js';
export interface VideosSearchQuery extends SearchTargetQuery, VideosCommonQuery {
    search?: string;
    host?: string;
    startDate?: string;
    endDate?: string;
    originallyPublishedStartDate?: string;
    originallyPublishedEndDate?: string;
    durationMin?: number;
    durationMax?: number;
    uuids?: string[];
}
export interface VideosSearchQueryAfterSanitize extends VideosSearchQuery {
    start: number;
    count: number;
    sort: string;
}
//# sourceMappingURL=videos-search-query.model.d.ts.map