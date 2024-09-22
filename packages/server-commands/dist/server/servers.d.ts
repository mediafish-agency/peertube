import { PeerTubeServer, RunServerOptions } from './server.js';
declare function createSingleServer(serverNumber: number, configOverride?: object, options?: RunServerOptions): Promise<PeerTubeServer>;
declare function createMultipleServers(totalServers: number, configOverride?: object, options?: RunServerOptions): Promise<PeerTubeServer[]>;
declare function killallServers(servers: PeerTubeServer[]): Promise<void[]>;
declare function cleanupTests(servers: PeerTubeServer[]): Promise<any[]>;
declare function getServerImportConfig(mode: 'youtube-dl' | 'yt-dlp'): {
    import: {
        videos: {
            http: {
                youtube_dl_release: {
                    url: string;
                    name: "youtube-dl" | "yt-dlp";
                };
            };
        };
    };
};
export { createSingleServer, createMultipleServers, cleanupTests, killallServers, getServerImportConfig };
//# sourceMappingURL=servers.d.ts.map