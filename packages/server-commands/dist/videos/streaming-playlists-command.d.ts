import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class StreamingPlaylistsCommand extends AbstractCommand {
    get(options: OverrideCommandOptions & {
        url: string;
        videoFileToken?: string;
        reinjectVideoFileToken?: boolean;
        withRetry?: boolean;
        currentRetry?: number;
    }): Promise<string>;
    getFragmentedSegment(options: OverrideCommandOptions & {
        url: string;
        range?: string;
        withRetry?: boolean;
        currentRetry?: number;
    }): any;
    getSegmentSha256(options: OverrideCommandOptions & {
        url: string;
        withRetry?: boolean;
        currentRetry?: number;
    }): any;
}
//# sourceMappingURL=streaming-playlists-command.d.ts.map