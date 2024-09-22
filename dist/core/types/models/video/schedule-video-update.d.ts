import { ScheduleVideoUpdateModel } from '../../../models/video/schedule-video-update.js';
export type MScheduleVideoUpdate = Omit<ScheduleVideoUpdateModel, 'Video'>;
export type MScheduleVideoUpdateFormattable = Pick<MScheduleVideoUpdate, 'updateAt' | 'privacy'>;
//# sourceMappingURL=schedule-video-update.d.ts.map