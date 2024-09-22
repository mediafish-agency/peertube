import { VideoPrivacy } from './video-privacy.enum.js';
export interface VideoScheduleUpdate {
    updateAt: Date | string;
    privacy?: typeof VideoPrivacy.PUBLIC | typeof VideoPrivacy.UNLISTED | typeof VideoPrivacy.INTERNAL;
}
//# sourceMappingURL=video-schedule-update.model.d.ts.map