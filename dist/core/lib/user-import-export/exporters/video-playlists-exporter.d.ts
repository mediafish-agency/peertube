import { AbstractUserExporter } from './abstract-user-exporter.js';
import { VideoPlaylistsExportJSON } from '@peertube/peertube-models';
export declare class VideoPlaylistsExporter extends AbstractUserExporter<VideoPlaylistsExportJSON> {
    export(): Promise<{
        json: {
            videoPlaylists: {
                displayName: string;
                description: string;
                privacy: import("@peertube/peertube-models").VideoPlaylistPrivacyType;
                url: string;
                uuid: string;
                type: import("@peertube/peertube-models").VideoPlaylistType_Type;
                channel: {
                    name: string;
                };
                createdAt: string;
                updatedAt: string;
                thumbnailUrl: string;
                elements: {
                    videoUrl: string;
                    startTimestamp?: number;
                    stopTimestamp?: number;
                }[];
                archiveFiles: {
                    thumbnail: string | null;
                };
            }[];
        };
        staticFiles: {
            archivePath: string;
            readStreamFactory: () => Promise<import("stream").Readable>;
        }[];
    }>;
    private getArchiveThumbnailPath;
}
//# sourceMappingURL=video-playlists-exporter.d.ts.map