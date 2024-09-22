export function setAccessTokensToServers(servers) {
    return Promise.all(servers.map(async (server) => {
        const token = await server.login.getAccessToken();
        server.accessToken = token;
    }));
}
//# sourceMappingURL=login.js.map