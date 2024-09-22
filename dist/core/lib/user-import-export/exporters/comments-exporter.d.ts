import { AbstractUserExporter } from './abstract-user-exporter.js';
import { CommentsExportJSON, VideoCommentObject } from '@peertube/peertube-models';
export declare class CommentsExporter extends AbstractUserExporter<CommentsExportJSON> {
    export(): Promise<{
        json: {
            comments: {
                url: string;
                text: string;
                createdAt: string;
                videoUrl: string;
                inReplyToCommentUrl: string;
            }[];
        };
        activityPubOutbox: import("@peertube/peertube-models").ActivityCreate<VideoCommentObject>[];
        staticFiles: any[];
    }>;
    private formatCommentsJSON;
    private formatCommentsAP;
}
//# sourceMappingURL=comments-exporter.d.ts.map