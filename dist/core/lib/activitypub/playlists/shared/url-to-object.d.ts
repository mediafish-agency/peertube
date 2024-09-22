import { PlaylistElementObject, PlaylistObject } from '@peertube/peertube-models';
declare function fetchRemoteVideoPlaylist(playlistUrl: string): Promise<{
    statusCode: number;
    playlistObject: PlaylistObject;
}>;
declare function fetchRemotePlaylistElement(elementUrl: string): Promise<{
    statusCode: number;
    elementObject: PlaylistElementObject;
}>;
export { fetchRemoteVideoPlaylist, fetchRemotePlaylistElement };
//# sourceMappingURL=url-to-object.d.ts.map