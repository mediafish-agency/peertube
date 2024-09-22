import { VideoPlaylistPrivacyType } from './video-playlist-privacy.model.js';
export interface VideoPlaylistCreate {
    displayName: string;
    privacy: VideoPlaylistPrivacyType;
    description?: string;
    videoChannelId?: number;
    thumbnailfile?: any;
}
//# sourceMappingURL=video-playlist-create.model.d.ts.map