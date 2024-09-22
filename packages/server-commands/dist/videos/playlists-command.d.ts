import { BooleanBothQuery, ResultList, VideoExistInPlaylist, VideoPlaylist, VideoPlaylistCreate, VideoPlaylistCreateResult, VideoPlaylistElement, VideoPlaylistElementCreate, VideoPlaylistElementCreateResult, VideoPlaylistElementUpdate, VideoPlaylistPrivacyType, VideoPlaylistReorder, VideoPlaylistType_Type, VideoPlaylistUpdate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class PlaylistsCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        playlistType?: VideoPlaylistType_Type;
    }): Promise<ResultList<VideoPlaylist>>;
    listByChannel(options: OverrideCommandOptions & {
        handle: string;
        start?: number;
        count?: number;
        sort?: string;
        playlistType?: VideoPlaylistType_Type;
    }): Promise<ResultList<VideoPlaylist>>;
    listByAccount(options: OverrideCommandOptions & {
        handle: string;
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
        playlistType?: VideoPlaylistType_Type;
    }): Promise<ResultList<VideoPlaylist>>;
    get(options: OverrideCommandOptions & {
        playlistId: number | string;
    }): Promise<VideoPlaylist>;
    getWatchLater(options: OverrideCommandOptions & {
        handle: string;
    }): Promise<VideoPlaylist>;
    listVideos(options: OverrideCommandOptions & {
        playlistId: number | string;
        start?: number;
        count?: number;
        query?: {
            nsfw?: BooleanBothQuery;
        };
    }): Promise<ResultList<VideoPlaylistElement>>;
    delete(options: OverrideCommandOptions & {
        playlistId: number | string;
    }): import("supertest").Test;
    create(options: OverrideCommandOptions & {
        attributes: VideoPlaylistCreate;
    }): Promise<VideoPlaylistCreateResult>;
    quickCreate(options: OverrideCommandOptions & {
        displayName: string;
        privacy?: VideoPlaylistPrivacyType;
    }): Promise<VideoPlaylistCreateResult>;
    update(options: OverrideCommandOptions & {
        attributes: VideoPlaylistUpdate;
        playlistId: number | string;
    }): import("supertest").SuperTestStatic.Test;
    addElement(options: OverrideCommandOptions & {
        playlistId: number | string;
        attributes: VideoPlaylistElementCreate | {
            videoId: string;
        };
    }): Promise<VideoPlaylistElementCreateResult>;
    updateElement(options: OverrideCommandOptions & {
        playlistId: number | string;
        elementId: number | string;
        attributes: VideoPlaylistElementUpdate;
    }): import("supertest").Test;
    removeElement(options: OverrideCommandOptions & {
        playlistId: number | string;
        elementId: number;
    }): import("supertest").Test;
    reorderElements(options: OverrideCommandOptions & {
        playlistId: number | string;
        attributes: VideoPlaylistReorder;
    }): import("supertest").Test;
    getPrivacies(options?: OverrideCommandOptions): Promise<{
        [id: number]: string;
    }>;
    videosExist(options: OverrideCommandOptions & {
        videoIds: number[];
    }): Promise<VideoExistInPlaylist>;
}
//# sourceMappingURL=playlists-command.d.ts.map