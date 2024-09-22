import { HttpStatusCodeType, ResultList, UserVideoRateType, Video, VideoCreate, VideoCreateResult, VideoDetails, VideoFileMetadata, VideoPrivacyType, VideosCommonQuery, VideoSource, VideoTranscodingCreate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export type VideoEdit = Partial<Omit<VideoCreate, 'thumbnailfile' | 'previewfile'>> & {
    fixture?: string;
    thumbnailfile?: string;
    previewfile?: string;
};
export declare class VideosCommand extends AbstractCommand {
    getCategories(options?: OverrideCommandOptions): Promise<{
        [id: number]: string;
    }>;
    getLicences(options?: OverrideCommandOptions): Promise<{
        [id: number]: string;
    }>;
    getLanguages(options?: OverrideCommandOptions): Promise<{
        [id: string]: string;
    }>;
    getPrivacies(options?: OverrideCommandOptions): Promise<{
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    }>;
    getDescription(options: OverrideCommandOptions & {
        descriptionPath: string;
    }): Promise<{
        description: string;
    }>;
    getFileMetadata(options: OverrideCommandOptions & {
        url: string;
    }): Promise<VideoFileMetadata>;
    rate(options: OverrideCommandOptions & {
        id: number | string;
        rating: UserVideoRateType;
        videoPassword?: string;
    }): import("supertest").Test;
    get(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<VideoDetails>;
    getWithToken(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<VideoDetails>;
    getWithPassword(options: OverrideCommandOptions & {
        id: number | string;
        password?: string;
    }): Promise<VideoDetails>;
    getSource(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<VideoSource>;
    deleteSource(options: OverrideCommandOptions & {
        id: number | string;
    }): import("supertest").Test;
    getId(options: OverrideCommandOptions & {
        uuid: number | string;
    }): Promise<number>;
    listFiles(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<import("@peertube/peertube-models").VideoFile[]>;
    listMyVideos(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
        isLive?: boolean;
        channelId?: number;
        autoTagOneOf?: string[];
    }): Promise<ResultList<Video>>;
    listMySubscriptionVideos(options?: OverrideCommandOptions & VideosCommonQuery): Promise<ResultList<Video>>;
    list(options?: OverrideCommandOptions & VideosCommonQuery): Promise<ResultList<Video>>;
    listWithToken(options?: OverrideCommandOptions & VideosCommonQuery): Promise<ResultList<Video>>;
    listAllForAdmin(options?: OverrideCommandOptions & VideosCommonQuery): Promise<ResultList<Video>>;
    listByAccount(options: OverrideCommandOptions & VideosCommonQuery & {
        handle: string;
    }): Promise<ResultList<Video>>;
    listByChannel(options: OverrideCommandOptions & VideosCommonQuery & {
        handle: string;
    }): Promise<ResultList<Video>>;
    find(options: OverrideCommandOptions & {
        name: string;
    }): Promise<Video>;
    findFull(options: OverrideCommandOptions & {
        name: string;
    }): Promise<VideoDetails>;
    update(options: OverrideCommandOptions & {
        id: number | string;
        attributes?: VideoEdit;
    }): import("supertest").Test;
    remove(options: OverrideCommandOptions & {
        id: number | string;
    }): Promise<unknown>;
    removeAll(): Promise<void>;
    upload(options?: OverrideCommandOptions & {
        attributes?: VideoEdit;
        mode?: 'legacy' | 'resumable';
        waitTorrentGeneration?: boolean;
        completedExpectedStatus?: HttpStatusCodeType;
    }): Promise<VideoCreateResult>;
    buildLegacyUpload(options: OverrideCommandOptions & {
        attributes: VideoEdit;
    }): Promise<VideoCreateResult>;
    quickUpload(options: OverrideCommandOptions & {
        name: string;
        nsfw?: boolean;
        privacy?: VideoPrivacyType;
        fixture?: string;
        videoPasswords?: string[];
        channelId?: number;
    }): Promise<VideoCreateResult>;
    randomUpload(options?: OverrideCommandOptions & {
        wait?: boolean;
        additionalParams?: VideoEdit & {
            prefixName?: string;
        };
    }): Promise<{
        name: string;
        id: number;
        uuid: string;
        shortUUID: string;
    }>;
    replaceSourceFile(options: OverrideCommandOptions & {
        videoId: number | string;
        fixture: string;
        completedExpectedStatus?: HttpStatusCodeType;
    }): Promise<unknown>;
    removeHLSPlaylist(options: OverrideCommandOptions & {
        videoId: number | string;
    }): import("supertest").Test;
    removeHLSFile(options: OverrideCommandOptions & {
        videoId: number | string;
        fileId: number;
    }): import("supertest").Test;
    removeAllWebVideoFiles(options: OverrideCommandOptions & {
        videoId: number | string;
    }): import("supertest").Test;
    removeWebVideoFile(options: OverrideCommandOptions & {
        videoId: number | string;
        fileId: number;
    }): import("supertest").Test;
    runTranscoding(options: OverrideCommandOptions & VideoTranscodingCreate & {
        videoId: number | string;
    }): import("supertest").Test;
    private buildListQuery;
    buildUploadFields(attributes: VideoEdit): VideoEdit;
    buildUploadAttaches(attributes: VideoEdit, includeFixture: boolean): {
        [name: string]: string;
    };
    sendResumableVideoChunks(options: Parameters<AbstractCommand['sendResumableChunks']>[0]): Promise<import("got").Response<{
        video: VideoCreateResult;
    }>>;
    buildResumeVideoUpload(options: Parameters<AbstractCommand['buildResumeUpload']>[0]): Promise<VideoCreateResult>;
    prepareVideoResumableUpload(options: Parameters<AbstractCommand['prepareResumableUpload']>[0]): Promise<import("superagent/lib/node/response.js")>;
    endVideoResumableUpload(options: Parameters<AbstractCommand['endResumableUpload']>[0]): import("supertest").Test;
    generateDownload(options: OverrideCommandOptions & {
        videoId: number | string;
        videoFileIds: number[];
        query?: Record<string, string>;
    }): Promise<Buffer>;
}
//# sourceMappingURL=videos-command.d.ts.map