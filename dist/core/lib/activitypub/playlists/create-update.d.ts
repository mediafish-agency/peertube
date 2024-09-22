import { MVideoPlaylistFull } from '../../../types/models/index.js';
import { PlaylistObject } from '@peertube/peertube-models';
declare function createAccountPlaylists(playlistUrls: string[]): Promise<void>;
declare function createOrUpdateVideoPlaylist(playlistObject: PlaylistObject, to?: string[]): Promise<MVideoPlaylistFull>;
export { createAccountPlaylists, createOrUpdateVideoPlaylist };
//# sourceMappingURL=create-update.d.ts.map