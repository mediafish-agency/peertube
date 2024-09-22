import { PickWith } from '@peertube/peertube-typescript-utils';
import { VideoAutomaticTagModel } from '../../../models/automatic-tag/video-automatic-tag.js';
import { MAutomaticTag } from './automatic-tag.js';
type Use<K extends keyof VideoAutomaticTagModel, M> = PickWith<VideoAutomaticTagModel, K, M>;
export type MVideoAutomaticTag = Omit<VideoAutomaticTagModel, 'Account' | 'Video' | 'AutomaticTag'>;
export type MVideoAutomaticTagWithTag = MVideoAutomaticTag & Use<'AutomaticTag', MAutomaticTag>;
export {};
//# sourceMappingURL=video-automatic-tag.d.ts.map