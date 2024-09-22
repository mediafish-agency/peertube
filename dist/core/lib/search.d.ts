import express from 'express';
import { SearchTargetQuery } from '@peertube/peertube-models';
declare function isSearchIndexSearch(query: SearchTargetQuery): boolean;
declare function buildMutedForSearchIndex(res: express.Response): Promise<{
    blockedHosts: string[];
    blockedAccounts: string[];
}>;
declare function isURISearch(search: string): boolean;
export { isSearchIndexSearch, buildMutedForSearchIndex, isURISearch };
//# sourceMappingURL=search.d.ts.map