import { VideoViewEvent } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ViewsCommand extends AbstractCommand {
    view(options: OverrideCommandOptions & {
        id: number | string;
        currentTime: number;
        viewEvent?: VideoViewEvent;
        xForwardedFor?: string;
        sessionId?: string;
    }): import("supertest").Test;
    simulateView(options: OverrideCommandOptions & {
        id: number | string;
        xForwardedFor?: string;
        sessionId?: string;
    }): Promise<void>;
    simulateViewer(options: OverrideCommandOptions & {
        id: number | string;
        currentTimes: number[];
        xForwardedFor?: string;
        sessionId?: string;
    }): Promise<void>;
}
//# sourceMappingURL=views-command.d.ts.map