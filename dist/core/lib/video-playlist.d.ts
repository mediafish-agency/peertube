import * as Sequelize from 'sequelize';
import { MAccount, MVideoThumbnail } from '../types/models/index.js';
import { MVideoPlaylistOwner, MVideoPlaylistThumbnail } from '../types/models/video/video-playlist.js';
export declare function createWatchLaterPlaylist(account: MAccount, t: Sequelize.Transaction): Promise<MVideoPlaylistOwner>;
export declare function generateThumbnailForPlaylist(videoPlaylist: MVideoPlaylistThumbnail, video: MVideoThumbnail): Promise<void>;
//# sourceMappingURL=video-playlist.d.ts.map