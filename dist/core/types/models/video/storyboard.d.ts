import { StoryboardModel } from '../../../models/video/storyboard.js';
import { PickWith } from '@peertube/peertube-typescript-utils';
import { MVideo } from './video.js';
type Use<K extends keyof StoryboardModel, M> = PickWith<StoryboardModel, K, M>;
export type MStoryboard = Omit<StoryboardModel, 'Video'>;
export type MStoryboardVideo = MStoryboard & Use<'Video', MVideo>;
export {};
//# sourceMappingURL=storyboard.d.ts.map