import { VideoChapter, VideoChapterUpdate } from '@peertube/peertube-models';
import { Unpacked } from '@peertube/peertube-typescript-utils';
export declare function areVideoChaptersValid(value: VideoChapter[]): boolean;
export declare function isVideoChapterValid(value: Unpacked<VideoChapterUpdate['chapters']>): boolean;
export declare function isVideoChapterTitleValid(value: any): boolean;
export declare function isVideoChapterTimecodeValid(value: any): boolean;
//# sourceMappingURL=video-chapters.d.ts.map