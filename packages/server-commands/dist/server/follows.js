import { waitJobs } from './jobs.js';
export async function doubleFollow(server1, server2) {
    await Promise.all([
        server1.follows.follow({ hosts: [server2.url] }),
        server2.follows.follow({ hosts: [server1.url] })
    ]);
    await waitJobs([server1, server2]);
}
export function followAll(servers) {
    const p = [];
    for (const server of servers) {
        for (const remoteServer of servers) {
            if (server === remoteServer)
                continue;
            p.push(doubleFollow(server, remoteServer));
        }
    }
    return Promise.all(p);
}
//# sourceMappingURL=follows.js.map