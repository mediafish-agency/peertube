import { VideoExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type ImportObject = VideoExportJSON['videos'][0];
type SanitizedObject = Pick<ImportObject, 'name' | 'duration' | 'channel' | 'privacy' | 'archiveFiles' | 'captions' | 'category' | 'licence' | 'language' | 'description' | 'support' | 'nsfw' | 'isLive' | 'commentsPolicy' | 'downloadEnabled' | 'waitTranscoding' | 'originallyPublishedAt' | 'tags' | 'live' | 'passwords' | 'source' | 'chapters'>;
export declare class VideosImporter extends AbstractUserImporter<VideoExportJSON, ImportObject, SanitizedObject> {
    protected getImportObjects(json: VideoExportJSON): {
        uuid: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        originallyPublishedAt: string;
        name: string;
        category: number;
        licence: number;
        language: string;
        tags: string[];
        privacy: import("@peertube/peertube-models").VideoPrivacyType;
        passwords: string[];
        duration: number;
        description: string;
        support: string;
        isLive: boolean;
        live?: {
            saveReplay: boolean;
            permanentLive: boolean;
            latencyMode: import("@peertube/peertube-models").LiveVideoLatencyModeType;
            streamKey: string;
            replaySettings?: {
                privacy: import("@peertube/peertube-models").VideoPrivacyType;
            };
        };
        url: string;
        thumbnailUrl: string;
        previewUrl: string;
        views: number;
        likes: number;
        dislikes: number;
        nsfw: boolean;
        commentsEnabled?: boolean;
        commentsPolicy: import("@peertube/peertube-models").VideoCommentPolicyType;
        downloadEnabled: boolean;
        channel: {
            name: string;
        };
        waitTranscoding: boolean;
        state: import("@peertube/peertube-models").VideoStateType;
        captions: {
            createdAt: string;
            updatedAt: string;
            language: string;
            filename: string;
            fileUrl: string;
            automaticallyGenerated: boolean;
        }[];
        chapters: {
            timecode: number;
            title: string;
        }[];
        files: import("@peertube/peertube-models").VideoFileExportJSON[];
        streamingPlaylists: {
            type: import("@peertube/peertube-models").VideoStreamingPlaylistType_Type;
            playlistUrl: string;
            segmentsSha256Url: string;
            files: import("@peertube/peertube-models").VideoFileExportJSON[];
        }[];
        source?: {
            inputFilename: string;
            resolution: number;
            size: number;
            width: number;
            height: number;
            fps: number;
            metadata: import("@peertube/peertube-models").VideoFileMetadata;
        };
        archiveFiles: {
            videoFile: string | null;
            thumbnail: string | null;
            captions: Record<string, string>;
        };
    }[];
    protected sanitize(o: ImportObject): Pick<{
        uuid: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        originallyPublishedAt: string;
        name: string;
        category: number;
        licence: number;
        language: string;
        tags: string[];
        privacy: import("@peertube/peertube-models").VideoPrivacyType;
        passwords: string[];
        duration: number;
        description: string;
        support: string;
        isLive: boolean;
        live?: {
            saveReplay: boolean;
            permanentLive: boolean;
            latencyMode: import("@peertube/peertube-models").LiveVideoLatencyModeType;
            streamKey: string;
            replaySettings?: {
                privacy: import("@peertube/peertube-models").VideoPrivacyType;
            };
        };
        url: string;
        thumbnailUrl: string;
        previewUrl: string;
        views: number;
        likes: number;
        dislikes: number;
        nsfw: boolean;
        commentsEnabled?: boolean;
        commentsPolicy: import("@peertube/peertube-models").VideoCommentPolicyType;
        downloadEnabled: boolean;
        channel: {
            name: string;
        };
        waitTranscoding: boolean;
        state: import("@peertube/peertube-models").VideoStateType;
        captions: {
            createdAt: string;
            updatedAt: string;
            language: string;
            filename: string;
            fileUrl: string;
            automaticallyGenerated: boolean;
        }[];
        chapters: {
            timecode: number;
            title: string;
        }[];
        files: import("@peertube/peertube-models").VideoFileExportJSON[];
        streamingPlaylists: {
            type: import("@peertube/peertube-models").VideoStreamingPlaylistType_Type;
            playlistUrl: string;
            segmentsSha256Url: string;
            files: import("@peertube/peertube-models").VideoFileExportJSON[];
        }[];
        source?: {
            inputFilename: string;
            resolution: number;
            size: number;
            width: number;
            height: number;
            fps: number;
            metadata: import("@peertube/peertube-models").VideoFileMetadata;
        };
        archiveFiles: {
            videoFile: string | null;
            thumbnail: string | null;
            captions: Record<string, string>;
        };
    }, "name" | "duration" | "originallyPublishedAt" | "live" | "tags" | "language" | "category" | "licence" | "privacy" | "nsfw" | "description" | "support" | "isLive" | "commentsPolicy" | "downloadEnabled" | "waitTranscoding" | "source" | "channel" | "chapters" | "captions" | "passwords" | "archiveFiles">;
    protected importObject(videoImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
    private importCaptions;
    private checkVideoFileIsAcceptedOrThrow;
}
export {};
//# sourceMappingURL=videos-importer.d.ts.map