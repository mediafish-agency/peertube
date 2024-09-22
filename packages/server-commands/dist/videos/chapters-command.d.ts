import { VideoChapter, VideoChapterUpdate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ChaptersCommand extends AbstractCommand {
    list(options: OverrideCommandOptions & {
        videoId: string | number;
    }): Promise<{
        chapters: VideoChapter[];
    }>;
    update(options: OverrideCommandOptions & VideoChapterUpdate & {
        videoId: number | string;
    }): import("supertest").Test;
}
//# sourceMappingURL=chapters-command.d.ts.map