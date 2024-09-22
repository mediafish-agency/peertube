import { ResultList, VideoImport, VideoImportCreate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class VideoImportsCommand extends AbstractCommand {
    importVideo(options: OverrideCommandOptions & {
        attributes: (Partial<VideoImportCreate> | {
            torrentfile?: string;
            previewfile?: string;
            thumbnailfile?: string;
        });
    }): Promise<VideoImport>;
    delete(options: OverrideCommandOptions & {
        importId: number;
    }): import("supertest").Test;
    cancel(options: OverrideCommandOptions & {
        importId: number;
    }): import("supertest").Test;
    getMyVideoImports(options?: OverrideCommandOptions & {
        sort?: string;
        targetUrl?: string;
        videoChannelSyncId?: number;
        search?: string;
    }): Promise<ResultList<VideoImport>>;
}
//# sourceMappingURL=video-imports-command.d.ts.map