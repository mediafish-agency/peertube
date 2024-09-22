import { VideoStudioTask } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class VideoStudioCommand extends AbstractCommand {
    static getComplexTask(): VideoStudioTask[];
    createEditionTasks(options: OverrideCommandOptions & {
        videoId: number | string;
        tasks: VideoStudioTask[];
    }): import("supertest").SuperTestStatic.Test;
}
//# sourceMappingURL=video-studio-command.d.ts.map