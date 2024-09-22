import { PlaylistElementObject, PlaylistObject } from '@peertube/peertube-models';
import { AttributesOnly } from '@peertube/peertube-typescript-utils';
import { VideoPlaylistElementModel } from '../../../../models/video/video-playlist-element.js';
import { VideoPlaylistModel } from '../../../../models/video/video-playlist.js';
import { MVideoId, MVideoPlaylistId } from '../../../../types/models/index.js';
export declare function playlistObjectToDBAttributes(playlistObject: PlaylistObject, to: string[]): AttributesOnly<VideoPlaylistModel>;
export declare function playlistElementObjectToDBAttributes(elementObject: PlaylistElementObject, videoPlaylist: MVideoPlaylistId, video: MVideoId): AttributesOnly<VideoPlaylistElementModel>;
//# sourceMappingURL=object-to-model-attributes.d.ts.map