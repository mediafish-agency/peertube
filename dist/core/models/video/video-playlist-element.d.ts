import { Transaction } from 'sequelize';
import { PlaylistElementObject, VideoPlaylistElement } from '@peertube/peertube-models';
import { MUserAccountId } from '../../types/models/index.js';
import { MVideoPlaylistElement, MVideoPlaylistElementAP, MVideoPlaylistElementFormattable, MVideoPlaylistElementVideoUrlPlaylistPrivacy, MVideoPlaylistElementVideoThumbnail, MVideoPlaylistElementVideoUrl } from '../../types/models/video/video-playlist-element.js';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoPlaylistModel } from './video-playlist.js';
import { VideoModel } from './video.js';
export declare class VideoPlaylistElementModel extends SequelizeModel<VideoPlaylistElementModel> {
    createdAt: Date;
    updatedAt: Date;
    url: string;
    position: number;
    startTimestamp: number;
    stopTimestamp: number;
    videoPlaylistId: number;
    VideoPlaylist: Awaited<VideoPlaylistModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
    static deleteAllOf(videoPlaylistId: number, transaction?: Transaction): Promise<number>;
    static listForApi(options: {
        start: number;
        count: number;
        videoPlaylistId: number;
        serverAccount: AccountModel;
        user?: MUserAccountId;
    }): Promise<{
        total: number;
        data: VideoPlaylistElementModel[];
    }>;
    static loadByPlaylistAndVideo(videoPlaylistId: number, videoId: number): Promise<MVideoPlaylistElement>;
    static loadById(playlistElementId: number | string): Promise<MVideoPlaylistElement>;
    static loadByPlaylistAndElementIdForAP(playlistId: number | string, playlistElementId: number): Promise<MVideoPlaylistElementVideoUrlPlaylistPrivacy>;
    static loadFirstElementWithVideoThumbnail(videoPlaylistId: number): Promise<MVideoPlaylistElementVideoThumbnail>;
    static listUrlsOfForAP(videoPlaylistId: number, start: number, count: number, t?: Transaction): Promise<{
        total: number;
        data: string[];
    }>;
    static listElementsForExport(videoPlaylistId: number): Promise<MVideoPlaylistElementVideoUrl[]>;
    static getNextPositionOf(videoPlaylistId: number, transaction?: Transaction): Promise<number>;
    static reassignPositionOf(options: {
        videoPlaylistId: number;
        firstPosition: number;
        endPosition: number;
        newPosition: number;
        transaction?: Transaction;
    }): Promise<[affectedCount: number]>;
    static increasePositionOf(videoPlaylistId: number, fromPosition: number, by?: number, transaction?: Transaction): Promise<[affectedRows: VideoPlaylistElementModel[], affectedCount?: number]>;
    toFormattedJSON(this: MVideoPlaylistElementFormattable, options?: {
        accountId?: number;
    }): VideoPlaylistElement;
    getType(this: MVideoPlaylistElementFormattable, accountId?: number): 0 | 1 | 2 | 3;
    getVideoElement(this: MVideoPlaylistElementFormattable, accountId?: number): import("@peertube/peertube-models").Video;
    toActivityPubObject(this: MVideoPlaylistElementAP): PlaylistElementObject;
}
//# sourceMappingURL=video-playlist-element.d.ts.map