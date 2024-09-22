import { VideoPrivacyType } from '@peertube/peertube-models';
import { MVideo, MVideoFullLight } from '../types/models/index.js';
declare function setVideoPrivacy(video: MVideo, newPrivacy: VideoPrivacyType): void;
declare function isVideoInPrivateDirectory(privacy: VideoPrivacyType): boolean;
declare function isVideoInPublicDirectory(privacy: VideoPrivacyType): boolean;
declare function moveFilesIfPrivacyChanged(video: MVideoFullLight, oldPrivacy: VideoPrivacyType): Promise<boolean>;
export { setVideoPrivacy, isVideoInPrivateDirectory, isVideoInPublicDirectory, moveFilesIfPrivacyChanged };
//# sourceMappingURL=video-privacy.d.ts.map