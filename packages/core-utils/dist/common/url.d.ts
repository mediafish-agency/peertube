import { Video, VideoPlaylist } from '@peertube/peertube-models';
declare function addQueryParams(url: string, params: {
    [id: string]: string;
}): string;
declare function removeQueryParams(url: string): string;
declare function queryParamsToObject(entries: URLSearchParams): {
    [id: string]: string | number | boolean;
};
declare function buildPlaylistLink(playlist: Pick<VideoPlaylist, 'shortUUID'>, base?: string): string;
declare function buildPlaylistWatchPath(playlist: Pick<VideoPlaylist, 'shortUUID'>): string;
declare function buildVideoWatchPath(video: Pick<Video, 'shortUUID'>): string;
declare function buildVideoLink(video: Pick<Video, 'shortUUID'>, base?: string): string;
declare function buildPlaylistEmbedPath(playlist: Pick<VideoPlaylist, 'uuid'>): string;
declare function buildPlaylistEmbedLink(playlist: Pick<VideoPlaylist, 'uuid'>, base?: string): string;
declare function buildVideoEmbedPath(video: Pick<Video, 'uuid'>): string;
declare function buildVideoEmbedLink(video: Pick<Video, 'uuid'>, base?: string): string;
declare function decorateVideoLink(options: {
    url: string;
    startTime?: number;
    stopTime?: number;
    subtitle?: string;
    loop?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    title?: boolean;
    warningTitle?: boolean;
    controls?: boolean;
    controlBar?: boolean;
    peertubeLink?: boolean;
    p2p?: boolean;
    api?: boolean;
}): string;
declare function decoratePlaylistLink(options: {
    url: string;
    playlistPosition?: number;
}): string;
export { addQueryParams, removeQueryParams, queryParamsToObject, buildPlaylistLink, buildVideoLink, buildVideoWatchPath, buildPlaylistWatchPath, buildPlaylistEmbedPath, buildVideoEmbedPath, buildPlaylistEmbedLink, buildVideoEmbedLink, decorateVideoLink, decoratePlaylistLink };
//# sourceMappingURL=url.d.ts.map