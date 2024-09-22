import { VideoResolutionType } from '@peertube/peertube-models';
import { Options as ExecaNodeOptions } from 'execa';
type ProcessOptions = Pick<ExecaNodeOptions, 'cwd' | 'maxBuffer'>;
export declare class YoutubeDLCLI {
    static safeGet(): Promise<YoutubeDLCLI>;
    static updateYoutubeDLBinary(): Promise<void>;
    static getYoutubeDLVideoFormat(enabledResolutions: VideoResolutionType[], useBestFormat: boolean): string;
    private constructor();
    download(options: {
        url: string;
        format: string;
        output: string;
        processOptions: ProcessOptions;
        timeout?: number;
        additionalYoutubeDLArgs?: string[];
    }): Promise<string[]>;
    getInfo(options: {
        url: string;
        format: string;
        processOptions: ProcessOptions;
        additionalYoutubeDLArgs?: string[];
    }): Promise<any>;
    getListInfo(options: {
        url: string;
        latestVideosCount?: number;
        processOptions: ProcessOptions;
    }): Promise<{
        upload_date: string;
        webpage_url: string;
    }[]>;
    getSubs(options: {
        url: string;
        format: 'vtt';
        processOptions: ProcessOptions;
    }): Promise<string[]>;
    private run;
    private wrapWithProxyOptions;
    private wrapWithIPOptions;
    private wrapWithFFmpegOptions;
}
export {};
//# sourceMappingURL=youtube-dl-cli.d.ts.map