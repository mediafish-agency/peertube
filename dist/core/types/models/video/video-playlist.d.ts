import { MVideoPlaylistElementLight } from './video-playlist-element.js';
import { PickWith } from '@peertube/peertube-typescript-utils';
import { VideoPlaylistModel } from '../../../models/video/video-playlist.js';
import { MAccount, MAccountDefault, MAccountSummary, MAccountSummaryFormattable } from '../account/index.js';
import { MThumbnail } from './thumbnail.js';
import { MChannelDefault, MChannelSummary, MChannelSummaryFormattable, MChannelUrl } from './video-channel.js';
type Use<K extends keyof VideoPlaylistModel, M> = PickWith<VideoPlaylistModel, K, M>;
export type MVideoPlaylist = Omit<VideoPlaylistModel, 'OwnerAccount' | 'VideoChannel' | 'VideoPlaylistElements' | 'Thumbnail'>;
export type MVideoPlaylistId = Pick<MVideoPlaylist, 'id'>;
export type MVideoPlaylistSummary = Pick<MVideoPlaylist, 'id'> & Pick<MVideoPlaylist, 'name'> & Pick<MVideoPlaylist, 'uuid'>;
export type MVideoPlaylistPrivacy = Pick<MVideoPlaylist, 'privacy'>;
export type MVideoPlaylistUUID = Pick<MVideoPlaylist, 'uuid'>;
export type MVideoPlaylistVideosLength = MVideoPlaylist & {
    videosLength?: number;
};
export type MVideoPlaylistSummaryWithElements = MVideoPlaylistSummary & Use<'VideoPlaylistElements', MVideoPlaylistElementLight[]>;
export type MVideoPlaylistOwner = MVideoPlaylist & Use<'OwnerAccount', MAccount>;
export type MVideoPlaylistOwnerDefault = MVideoPlaylist & Use<'OwnerAccount', MAccountDefault>;
export type MVideoPlaylistThumbnail = MVideoPlaylist & Use<'Thumbnail', MThumbnail>;
export type MVideoPlaylistAccountThumbnail = MVideoPlaylist & Use<'OwnerAccount', MAccountDefault> & Use<'Thumbnail', MThumbnail>;
export type MVideoPlaylistAccountChannelDefault = MVideoPlaylist & Use<'OwnerAccount', MAccountDefault> & Use<'VideoChannel', MChannelDefault>;
export type MVideoPlaylistFull = MVideoPlaylistVideosLength & Use<'OwnerAccount', MAccountDefault> & Use<'VideoChannel', MChannelDefault> & Use<'Thumbnail', MThumbnail>;
export type MVideoPlaylistAccountChannelSummary = MVideoPlaylist & Use<'OwnerAccount', MAccountSummary> & Use<'VideoChannel', MChannelSummary>;
export type MVideoPlaylistFullSummary = MVideoPlaylistVideosLength & Use<'Thumbnail', MThumbnail> & Use<'OwnerAccount', MAccountSummary> & Use<'VideoChannel', MChannelSummary>;
export type MVideoPlaylistFormattable = MVideoPlaylistVideosLength & Use<'OwnerAccount', MAccountSummaryFormattable> & Use<'VideoChannel', MChannelSummaryFormattable>;
export type MVideoPlaylistAP = MVideoPlaylist & Use<'Thumbnail', MThumbnail> & Use<'VideoChannel', MChannelUrl>;
export {};
//# sourceMappingURL=video-playlist.d.ts.map