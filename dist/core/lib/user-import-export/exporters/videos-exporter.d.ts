import { ActivityCreate, VideoExportJSON, VideoObject } from '@peertube/peertube-models';
import { Readable } from 'stream';
import { AbstractUserExporter } from './abstract-user-exporter.js';
export declare class VideosExporter extends AbstractUserExporter<VideoExportJSON> {
    private readonly options;
    constructor(options: ConstructorParameters<typeof AbstractUserExporter<VideoExportJSON>>[0] & {
        withVideoFiles: boolean;
    });
    export(): Promise<{
        json: {
            videos: {
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
        };
        activityPubOutbox: ActivityCreate<VideoObject>[];
        staticFiles: {
            archivePath: string;
            readStreamFactory: () => Promise<Readable>;
        }[];
    }>;
    private exportVideo;
    private exportVideoJSON;
    private exportLiveJSON;
    private exportCaptionsJSON;
    private exportChaptersJSON;
    private exportFilesJSON;
    private exportStreamingPlaylistsJSON;
    private exportVideoSourceJSON;
    private exportVideoAP;
    private exportVideoFiles;
    private generateVideoSourceReadStream;
    private generateVideoFileReadStream;
    private getArchiveVideo;
    private getArchiveVideoFilePath;
    private getArchiveCaptionFilePath;
    private getArchiveThumbnailFilePath;
}
//# sourceMappingURL=videos-exporter.d.ts.map