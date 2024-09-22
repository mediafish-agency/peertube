import { ResultList, Video, VideoChannel, VideoChannelsSearchQuery, VideoPlaylist, VideoPlaylistsSearchQuery, VideosSearchQuery } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class SearchCommand extends AbstractCommand {
    searchChannels(options: OverrideCommandOptions & {
        search: string;
    }): Promise<ResultList<VideoChannel>>;
    advancedChannelSearch(options: OverrideCommandOptions & {
        search: VideoChannelsSearchQuery;
    }): Promise<ResultList<VideoChannel>>;
    searchPlaylists(options: OverrideCommandOptions & {
        search: string;
    }): Promise<ResultList<VideoPlaylist>>;
    advancedPlaylistSearch(options: OverrideCommandOptions & {
        search: VideoPlaylistsSearchQuery;
    }): Promise<ResultList<VideoPlaylist>>;
    searchVideos(options: OverrideCommandOptions & {
        search: string;
        sort?: string;
    }): Promise<ResultList<Video>>;
    advancedVideoSearch(options: OverrideCommandOptions & {
        search: VideosSearchQuery;
    }): Promise<ResultList<Video>>;
}
//# sourceMappingURL=search-command.d.ts.map