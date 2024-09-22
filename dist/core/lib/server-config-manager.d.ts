import { HTMLServerConfig, ServerConfig, VideoResolutionType } from '@peertube/peertube-models';
declare class ServerConfigManager {
    private static instance;
    private serverCommit;
    private homepageEnabled;
    private constructor();
    init(): Promise<void>;
    updateHomepageState(content: string): void;
    getHTMLServerConfig(): Promise<HTMLServerConfig>;
    getServerConfig(ip?: string): Promise<ServerConfig>;
    getRegisteredThemes(): {
        npmName: string;
        name: string;
        version: string;
        description: string;
        css: string[];
        clientScripts: {
            [name: string]: import("@peertube/peertube-models").ClientScriptJSON;
        };
    }[];
    getRegisteredPlugins(): {
        npmName: string;
        name: string;
        version: string;
        description: string;
        clientScripts: {
            [name: string]: import("@peertube/peertube-models").ClientScriptJSON;
        };
    }[];
    getEnabledResolutions(type: 'vod' | 'live'): VideoResolutionType[];
    private getIdAndPassAuthPlugins;
    private getExternalAuthsPlugins;
    static get Instance(): ServerConfigManager;
}
export { ServerConfigManager };
//# sourceMappingURL=server-config-manager.d.ts.map