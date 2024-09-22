import { arrayify } from '@peertube/peertube-core-utils';
export function setDefaultVideoChannel(servers) {
    return Promise.all(servers.map(s => {
        return s.users.getMyInfo()
            .then(user => { s.store.channel = user.videoChannels[0]; });
    }));
}
export async function setDefaultChannelAvatar(serversArg, channelName = 'root_channel') {
    const servers = arrayify(serversArg);
    return Promise.all(servers.map(s => s.channels.updateImage({ channelName, fixture: 'avatar.png', type: 'avatar' })));
}
//# sourceMappingURL=channels.js.map