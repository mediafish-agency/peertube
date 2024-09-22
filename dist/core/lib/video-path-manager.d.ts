import { Awaitable } from '@peertube/peertube-typescript-utils';
import { MStreamingPlaylistVideo, MVideo, MVideoFile, MVideoFileStreamingPlaylistVideo, MVideoFileVideo, MVideoWithFile } from '../types/models/index.js';
type MakeAvailableCB<T> = (path: string) => Awaitable<T>;
type MakeAvailableMultipleCB<T> = (paths: string[]) => Awaitable<T>;
declare class VideoPathManager {
    private static instance;
    private readonly videoFileMutexStore;
    private constructor();
    getFSHLSOutputPath(video: MVideo, filename?: string): string;
    getFSRedundancyVideoFilePath(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, videoFile: MVideoFile): string;
    getFSVideoFileOutputPath(videoOrPlaylist: MVideo | MStreamingPlaylistVideo, videoFile: MVideoFile): string;
    getFSOriginalVideoFilePath(filename: string): string;
    makeAvailableVideoFiles<T>(videoFiles: (MVideoFileVideo | MVideoFileStreamingPlaylistVideo)[], cb: MakeAvailableMultipleCB<T>): Promise<T>;
    makeAvailableVideoFile<T>(videoFile: MVideoFileVideo | MVideoFileStreamingPlaylistVideo, cb: MakeAvailableCB<T>): Promise<T>;
    makeAvailableMaxQualityFiles<T>(video: MVideoWithFile, cb: (options: {
        videoPath: string;
        separatedAudioPath: string;
    }) => Awaitable<T>): Promise<T>;
    makeAvailableResolutionPlaylistFile<T>(videoFile: MVideoFileStreamingPlaylistVideo, cb: MakeAvailableCB<T>): Promise<T>;
    makeAvailablePlaylistFile<T>(playlist: MStreamingPlaylistVideo, filename: string, cb: MakeAvailableCB<T>): Promise<T>;
    lockFiles(videoUUID: string): Promise<import("async-mutex").MutexInterface.Releaser>;
    unlockFiles(videoUUID: string): void;
    private makeAvailableFactory;
    buildTMPDestination(filename: string): string;
    static get Instance(): VideoPathManager;
}
export { VideoPathManager };
//# sourceMappingURL=video-path-manager.d.ts.map