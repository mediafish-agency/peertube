import { io } from 'socket.io-client';
import { AbstractCommand } from '../shared/index.js';
export class SocketIOCommand extends AbstractCommand {
    getUserNotificationSocket(options = {}) {
        var _a;
        return io(this.server.url + '/user-notifications', {
            query: { accessToken: (_a = options.token) !== null && _a !== void 0 ? _a : this.server.accessToken }
        });
    }
    getLiveNotificationSocket() {
        return io(this.server.url + '/live-videos');
    }
    getRunnersSocket(options) {
        return io(this.server.url + '/runners', {
            reconnection: false,
            auth: { runnerToken: options.runnerToken }
        });
    }
}
//# sourceMappingURL=socket-io-command.js.map