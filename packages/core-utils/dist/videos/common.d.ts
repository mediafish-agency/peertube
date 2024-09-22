import { VideoDetails } from '@peertube/peertube-models';
export declare function getAllPrivacies(): (1 | 2 | 3 | 4 | 5)[];
export declare function getAllFiles(video: Partial<Pick<VideoDetails, 'files' | 'streamingPlaylists'>>): import("@peertube/peertube-models").VideoFile[];
export declare function getHLS(video: Partial<Pick<VideoDetails, 'streamingPlaylists'>>): import("@peertube/peertube-models").VideoStreamingPlaylist;
export declare function buildAspectRatio(options: {
    width: number;
    height: number;
}): number;
export declare function getResolutionLabel(options: {
    resolution: number;
    height: number;
    width: number;
}): string;
export declare function getResolutionAndFPSLabel(resolutionLabel: string, fps: number): string;
//# sourceMappingURL=common.d.ts.map