import { arrayify } from '@peertube/peertube-core-utils';
export async function setDefaultAccountAvatar(serversArg, token) {
    const servers = arrayify(serversArg);
    return Promise.all(servers.map(s => s.users.updateMyAvatar({ fixture: 'avatar.png', token })));
}
//# sourceMappingURL=accounts.js.map