import { Server as HTTPServer } from 'http';
import { MVideo, MVideoImmutable } from '../types/models/index.js';
import { UserNotificationModelForApi } from '../types/models/user/index.js';
declare class PeerTubeSocket {
    private static instance;
    private userNotificationSockets;
    private liveVideosNamespace;
    private readonly runnerSockets;
    private constructor();
    init(server: HTTPServer): void;
    sendNotification(userId: number, notification: UserNotificationModelForApi): void;
    sendVideoLiveNewState(video: MVideo): void;
    sendVideoViewsUpdate(video: MVideoImmutable, numViewers: number): void;
    sendVideoForceEnd(video: MVideo): void;
    sendAvailableJobsPingToRunners(): void;
    static get Instance(): PeerTubeSocket;
}
export { PeerTubeSocket };
//# sourceMappingURL=peertube-socket.d.ts.map