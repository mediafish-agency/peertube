import { MVideoAccountLightBlacklistAllFiles, MVideoFormattableDetails, MVideoFullLight, MVideoId, MVideoImmutable, MVideoThumbnailBlacklist } from '../../types/models/index.js';
type VideoLoadType = 'for-api' | 'all' | 'only-video-and-blacklist' | 'id' | 'none' | 'unsafe-only-immutable-attributes';
declare function loadVideo(id: number | string, fetchType: 'for-api', userId?: number): Promise<MVideoFormattableDetails>;
declare function loadVideo(id: number | string, fetchType: 'all', userId?: number): Promise<MVideoFullLight>;
declare function loadVideo(id: number | string, fetchType: 'unsafe-only-immutable-attributes'): Promise<MVideoImmutable>;
declare function loadVideo(id: number | string, fetchType: 'only-video-and-blacklist', userId?: number): Promise<MVideoThumbnailBlacklist>;
declare function loadVideo(id: number | string, fetchType: 'id' | 'none', userId?: number): Promise<MVideoId>;
declare function loadVideo(id: number | string, fetchType: VideoLoadType, userId?: number): Promise<MVideoFullLight | MVideoThumbnailBlacklist | MVideoId | MVideoImmutable>;
type VideoLoadByUrlType = 'all' | 'only-video-and-blacklist' | 'unsafe-only-immutable-attributes';
declare function loadVideoByUrl(url: string, fetchType: 'all'): Promise<MVideoAccountLightBlacklistAllFiles>;
declare function loadVideoByUrl(url: string, fetchType: 'unsafe-only-immutable-attributes'): Promise<MVideoImmutable>;
declare function loadVideoByUrl(url: string, fetchType: 'only-video-and-blacklist'): Promise<MVideoThumbnailBlacklist>;
declare function loadVideoByUrl(url: string, fetchType: VideoLoadByUrlType): Promise<MVideoAccountLightBlacklistAllFiles | MVideoThumbnailBlacklist | MVideoImmutable>;
declare function loadOrCreateVideoIfAllowedForUser(videoUrl: string): Promise<MVideoImmutable>;
export { loadOrCreateVideoIfAllowedForUser, loadVideo, loadVideoByUrl, type VideoLoadByUrlType, type VideoLoadType };
//# sourceMappingURL=video.d.ts.map