import { PeerTubePluginIndex, PeertubePluginIndexList, PeertubePluginLatestVersionResponse, ResultList } from '@peertube/peertube-models';
export declare function listAvailablePluginsFromIndex(options: PeertubePluginIndexList): Promise<ResultList<PeerTubePluginIndex>>;
export declare function getLatestPluginsVersion(npmNames: string[]): Promise<PeertubePluginLatestVersionResponse>;
export declare function getLatestPluginVersion(npmName: string): Promise<string>;
//# sourceMappingURL=plugin-index.d.ts.map