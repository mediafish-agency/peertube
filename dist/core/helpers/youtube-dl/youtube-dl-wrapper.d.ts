import { VideoResolutionType } from '@peertube/peertube-models';
import { YoutubeDLInfo } from './youtube-dl-info-builder.js';
export type YoutubeDLSubs = {
    language: string;
    filename: string;
    path: string;
}[];
declare class YoutubeDLWrapper {
    private readonly url;
    private readonly enabledResolutions;
    private readonly useBestFormat;
    constructor(url: string, enabledResolutions: VideoResolutionType[], useBestFormat: boolean);
    getInfoForDownload(youtubeDLArgs?: string[]): Promise<YoutubeDLInfo>;
    getInfoForListImport(options: {
        latestVideosCount?: number;
    }): Promise<string[]>;
    getSubtitles(): Promise<YoutubeDLSubs>;
    downloadVideo(fileExt: string, timeout: number): Promise<string>;
    private guessVideoPathWithExtension;
}
export { YoutubeDLWrapper };
//# sourceMappingURL=youtube-dl-wrapper.d.ts.map