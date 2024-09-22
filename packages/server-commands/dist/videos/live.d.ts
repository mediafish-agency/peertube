import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import { PeerTubeServer } from '../server/server.js';
export declare function sendRTMPStream(options: {
    rtmpBaseUrl: string;
    streamKey: string;
    fixtureName?: string;
    copyCodecs?: boolean;
}): ffmpeg.FfmpegCommand;
export declare function waitFfmpegUntilError(command: FfmpegCommand, successAfterMS?: number): Promise<void>;
export declare function testFfmpegStreamError(command: FfmpegCommand, shouldHaveError: boolean): Promise<void>;
export declare function stopFfmpeg(command: FfmpegCommand): Promise<void>;
export declare function waitUntilLivePublishedOnAllServers(servers: PeerTubeServer[], videoId: string): Promise<void>;
export declare function waitUntilLiveWaitingOnAllServers(servers: PeerTubeServer[], videoId: string): Promise<void>;
export declare function waitUntilLiveReplacedByReplayOnAllServers(servers: PeerTubeServer[], videoId: string): Promise<void>;
export declare function findExternalSavedVideo(server: PeerTubeServer, liveVideoUUID: string): Promise<import("@peertube/peertube-models").Video>;
//# sourceMappingURL=live.d.ts.map