import { ensureDir } from 'fs-extra/esm';
import { isGithubCI } from '@peertube/peertube-node-utils';
import { PeerTubeServer } from './server.js';
async function createSingleServer(serverNumber, configOverride, options = {}) {
    const server = new PeerTubeServer({ serverNumber });
    await server.flushAndRun(configOverride, options);
    return server;
}
function createMultipleServers(totalServers, configOverride, options = {}) {
    const serverPromises = [];
    for (let i = 1; i <= totalServers; i++) {
        serverPromises.push(createSingleServer(i, configOverride, options));
    }
    return Promise.all(serverPromises);
}
function killallServers(servers) {
    return Promise.all(servers.filter(s => !!s).map(s => s.kill()));
}
async function cleanupTests(servers) {
    await killallServers(servers);
    if (isGithubCI()) {
        await ensureDir('artifacts');
    }
    let p = [];
    for (const server of servers) {
        if (!server)
            continue;
        p = p.concat(server.servers.cleanupTests());
    }
    return Promise.all(p);
}
function getServerImportConfig(mode) {
    return {
        import: {
            videos: {
                http: {
                    youtube_dl_release: {
                        url: mode === 'youtube-dl'
                            ? 'https://api.github.com/repos/ytdl-org/youtube-dl/releases'
                            : 'https://api.github.com/repos/yt-dlp/yt-dlp/releases',
                        name: mode
                    }
                }
            }
        }
    };
}
export { createSingleServer, createMultipleServers, cleanupTests, killallServers, getServerImportConfig };
//# sourceMappingURL=servers.js.map