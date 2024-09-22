import { VideoPlaylistPrivacyType } from '../../../videos/playlist/video-playlist-privacy.model.js';
import { ConstantManager } from '../plugin-constant-manager.model.js';
export interface PluginPlaylistPrivacyManager extends ConstantManager<VideoPlaylistPrivacyType> {
    deletePlaylistPrivacy: (privacyKey: VideoPlaylistPrivacyType) => boolean;
}
//# sourceMappingURL=plugin-playlist-privacy-manager.model.d.ts.map