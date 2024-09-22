import { LiveVideoCreate, ThumbnailType_Type, VideoCreate, VideoStateType } from '@peertube/peertube-models';
import { LoggerTagsFn } from '../helpers/logger.js';
import { MChannelAccountLight, MUser, MVideoFile, MVideoFullLight } from '../types/models/index.js';
import { FfprobeData } from 'fluent-ffmpeg';
type VideoAttributes = Omit<VideoCreate, 'channelId'> & {
    duration: number;
    isLive: boolean;
    state: VideoStateType;
    inputFilename: string;
};
type LiveAttributes = Pick<LiveVideoCreate, 'permanentLive' | 'latencyMode' | 'saveReplay' | 'replaySettings'> & {
    streamKey?: string;
};
export type ThumbnailOptions = {
    path: string;
    type: ThumbnailType_Type;
    automaticallyGenerated: boolean;
    keepOriginal: boolean;
}[];
type ChaptersOption = {
    timecode: number;
    title: string;
}[];
type VideoAttributeHookFilter = 'filter:api.video.user-import.video-attribute.result' | 'filter:api.video.upload.video-attribute.result' | 'filter:api.video.live.video-attribute.result';
export declare class LocalVideoCreator {
    private readonly options;
    private readonly lTags;
    private readonly videoFilePath;
    private readonly videoFileProbe;
    private readonly videoAttributes;
    private readonly liveAttributes;
    private readonly channel;
    private readonly videoAttributeResultHook;
    private video;
    private videoFile;
    private videoPath;
    constructor(options: {
        lTags: LoggerTagsFn;
        videoFile: {
            path: string;
            probe: FfprobeData;
        };
        videoAttributes: VideoAttributes;
        liveAttributes: LiveAttributes;
        channel: MChannelAccountLight;
        user: MUser;
        videoAttributeResultHook: VideoAttributeHookFilter;
        thumbnails: ThumbnailOptions;
        chapters: ChaptersOption | undefined;
        fallbackChapters: {
            fromDescription: boolean;
            finalFallback: ChaptersOption | undefined;
        };
    });
    create(): Promise<{
        video: MVideoFullLight;
        videoFile: MVideoFile;
    }>;
    private createThumbnails;
    private buildVideo;
}
export {};
//# sourceMappingURL=local-video-creator.d.ts.map