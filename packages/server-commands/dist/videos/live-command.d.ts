import { LiveVideo, LiveVideoCreate, LiveVideoSession, LiveVideoUpdate, ResultList, VideoCreateResult, VideoDetails, VideoPrivacyType } from '@peertube/peertube-models';
import { ObjectStorageCommand, PeerTubeServer } from '../server/index.js';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class LiveCommand extends AbstractCommand {
    get(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<LiveVideo>;
    listSessions(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<ResultList<LiveVideoSession>>;
    findLatestSession(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<LiveVideoSession>;
    getReplaySession(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<LiveVideoSession>;
    update(options: OverrideCommandOptions & {
        videoId: number | string;
        fields: LiveVideoUpdate;
    }): import("supertest").Test;
    create(options: OverrideCommandOptions & {
        fields: LiveVideoCreate;
    }): Promise<VideoCreateResult>;
    quickCreate(options: OverrideCommandOptions & {
        saveReplay: boolean;
        permanentLive: boolean;
        name?: string;
        privacy?: VideoPrivacyType;
        videoPasswords?: string[];
    }): Promise<{
        video: VideoDetails;
        live: LiveVideo;
    }>;
    sendRTMPStreamInVideo(options: OverrideCommandOptions & {
        videoId: number | string;
        fixtureName?: string;
        copyCodecs?: boolean;
    }): Promise<import("fluent-ffmpeg").FfmpegCommand>;
    runAndTestStreamError(options: OverrideCommandOptions & {
        videoId: number | string;
        shouldHaveError: boolean;
        fixtureName?: string;
    }): Promise<void>;
    waitUntilPublished(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<void>;
    waitUntilWaiting(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<void>;
    waitUntilEnded(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<void>;
    waitUntilSegmentGeneration(options: OverrideCommandOptions & {
        server: PeerTubeServer;
        videoUUID: string;
        playlistNumber: number;
        segment: number;
        objectStorage?: ObjectStorageCommand;
        objectStorageBaseUrl?: string;
    }): Promise<void>;
    waitUntilReplacedByReplay(options: OverrideCommandOptions & {
        videoId: number | string;
    }): Promise<void>;
    getSegmentFile(options: OverrideCommandOptions & {
        videoUUID: string;
        playlistNumber: number;
        segment: number;
        objectStorage?: ObjectStorageCommand;
    }): import("supertest").Test;
    getPlaylistFile(options: OverrideCommandOptions & {
        videoUUID: string;
        playlistName: string;
        objectStorage?: ObjectStorageCommand;
    }): import("supertest").Test;
    countPlaylists(options: OverrideCommandOptions & {
        videoUUID: string;
    }): Promise<number>;
    private waitUntilState;
}
//# sourceMappingURL=live-command.d.ts.map