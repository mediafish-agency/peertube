import { VideoCommentPolicyType } from './index.js';
import { VideoPrivacyType } from './video-privacy.enum.js';
import { VideoScheduleUpdate } from './video-schedule-update.model.js';
export interface VideoUpdate {
    name?: string;
    category?: number;
    licence?: number;
    language?: string;
    description?: string;
    support?: string;
    privacy?: VideoPrivacyType;
    tags?: string[];
    commentsEnabled?: boolean;
    commentsPolicy?: VideoCommentPolicyType;
    downloadEnabled?: boolean;
    nsfw?: boolean;
    waitTranscoding?: boolean;
    channelId?: number;
    thumbnailfile?: Blob;
    previewfile?: Blob;
    scheduleUpdate?: VideoScheduleUpdate;
    originallyPublishedAt?: Date | string;
    videoPasswords?: string[];
    pluginData?: any;
}
//# sourceMappingURL=video-update.model.d.ts.map