import { VideoPrivacyType } from '../../../videos/video-privacy.enum.js';
import { ConstantManager } from '../plugin-constant-manager.model.js';
export interface PluginVideoPrivacyManager extends ConstantManager<VideoPrivacyType> {
    deletePrivacy: (privacyKey: VideoPrivacyType) => boolean;
}
//# sourceMappingURL=plugin-video-privacy-manager.model.d.ts.map