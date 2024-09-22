import { Transaction } from 'sequelize';
import { MActorDefault, MActorFollowersUrl, MActorId } from '../../types/models/index.js';
import { MVideoShareActor, MVideoShareFull } from '../../types/models/video/index.js';
import { ActorModel } from '../actor/actor.js';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class VideoShareModel extends SequelizeModel<VideoShareModel> {
    url: string;
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    Actor: Awaited<ActorModel>;
    videoId: number;
    Video: Awaited<VideoModel>;
    static load(actorId: number | string, videoId: number | string, t?: Transaction): Promise<MVideoShareActor>;
    static loadByUrl(url: string, t: Transaction): Promise<MVideoShareFull>;
    static listActorIdsAndFollowerUrlsByShare(videoId: number, t: Transaction): Promise<(MActorId & MActorFollowersUrl)[]>;
    static loadActorsWhoSharedVideosOf(actorOwnerId: number, t: Transaction): Promise<MActorDefault[]>;
    static loadActorsByVideoChannel(videoChannelId: number, t: Transaction): Promise<MActorDefault[]>;
    static listAndCountByVideoId(videoId: number, start: number, count: number, t?: Transaction): Promise<{
        total: number;
        data: VideoShareModel[];
    }>;
    static listRemoteShareUrlsOfLocalVideos(): Promise<string[]>;
    static cleanOldSharesOf(videoId: number, beforeUpdatedAt: Date): Promise<number>;
}
//# sourceMappingURL=video-share.d.ts.map