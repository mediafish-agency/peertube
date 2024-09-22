import { VideoToken } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class VideoTokenCommand extends AbstractCommand {
    create(options: OverrideCommandOptions & {
        videoId: number | string;
        videoPassword?: string;
    }): Promise<VideoToken>;
    getVideoFileToken(options: OverrideCommandOptions & {
        videoId: number | string;
        videoPassword?: string;
    }): Promise<string>;
}
//# sourceMappingURL=video-token-command.d.ts.map