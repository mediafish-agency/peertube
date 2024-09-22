import { VideoPlaylistsExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type ImportObject = VideoPlaylistsExportJSON['videoPlaylists'][0];
type SanitizedObject = Pick<ImportObject, 'type' | 'displayName' | 'privacy' | 'elements' | 'description' | 'elements' | 'channel' | 'archiveFiles'>;
export declare class VideoPlaylistsImporter extends AbstractUserImporter<VideoPlaylistsExportJSON, ImportObject, SanitizedObject> {
    protected getImportObjects(json: VideoPlaylistsExportJSON): {
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
    protected sanitize(o: ImportObject): Pick<{
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
    }, "type" | "displayName" | "privacy" | "description" | "channel" | "archiveFiles" | "elements">;
    protected importObject(playlistImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
    private createPlaylist;
    private getWatchLaterPlaylist;
    private createThumbnail;
    private createElements;
}
export {};
//# sourceMappingURL=video-playlists-importer.d.ts.map