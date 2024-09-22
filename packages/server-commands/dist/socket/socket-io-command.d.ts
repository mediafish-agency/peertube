import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class SocketIOCommand extends AbstractCommand {
    getUserNotificationSocket(options?: OverrideCommandOptions): import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    getLiveNotificationSocket(): import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    getRunnersSocket(options: {
        runnerToken: string;
    }): import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
}
//# sourceMappingURL=socket-io-command.d.ts.map