import { APObjectId } from '@peertube/peertube-models';
import { MVideoAccountLightBlacklistAllFiles, MVideoImmutable, MVideoThumbnailBlacklist } from '../../../types/models/index.js';
import { SyncParam } from './shared/index.js';
type GetVideoResult<T> = Promise<{
    video: T;
    created: boolean;
    autoBlacklisted?: boolean;
}>;
type GetVideoParamAll = {
    videoObject: APObjectId;
    syncParam?: SyncParam;
    fetchType?: 'all';
    allowRefresh?: boolean;
};
type GetVideoParamImmutable = {
    videoObject: APObjectId;
    syncParam?: SyncParam;
    fetchType: 'unsafe-only-immutable-attributes';
    allowRefresh: false;
};
type GetVideoParamOther = {
    videoObject: APObjectId;
    syncParam?: SyncParam;
    fetchType?: 'all' | 'only-video-and-blacklist';
    allowRefresh?: boolean;
};
export declare function getOrCreateAPVideo(options: GetVideoParamAll): GetVideoResult<MVideoAccountLightBlacklistAllFiles>;
export declare function getOrCreateAPVideo(options: GetVideoParamImmutable): GetVideoResult<MVideoImmutable>;
export declare function getOrCreateAPVideo(options: GetVideoParamOther): GetVideoResult<MVideoAccountLightBlacklistAllFiles | MVideoThumbnailBlacklist>;
export declare function maybeGetOrCreateAPVideo(options: GetVideoParamAll): GetVideoResult<MVideoAccountLightBlacklistAllFiles>;
export declare function maybeGetOrCreateAPVideo(options: GetVideoParamImmutable): GetVideoResult<MVideoImmutable>;
export declare function maybeGetOrCreateAPVideo(options: GetVideoParamOther): GetVideoResult<MVideoAccountLightBlacklistAllFiles | MVideoThumbnailBlacklist>;
export {};
//# sourceMappingURL=get.d.ts.map