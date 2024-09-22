import { ResultList, VideoCaption } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class CaptionsCommand extends AbstractCommand {
    add(options: OverrideCommandOptions & {
        videoId: string | number;
        language: string;
        fixture: string;
        mimeType?: string;
    }): import("supertest").SuperTestStatic.Test;
    runGenerate(options: OverrideCommandOptions & {
        videoId: string | number;
        forceTranscription?: boolean;
    }): import("supertest").Test;
    list(options: OverrideCommandOptions & {
        videoId: string | number;
        videoPassword?: string;
    }): Promise<ResultList<VideoCaption>>;
    delete(options: OverrideCommandOptions & {
        videoId: string | number;
        language: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=captions-command.d.ts.map