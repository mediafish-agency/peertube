import { ActorFollow, type FollowState } from '@peertube/peertube-models';
import { MActor, MActorFollowActors, MActorFollowActorsDefault, MActorFollowActorsDefaultSubscription, MActorFollowFollowingHost, MActorFollowFormattable } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { ActorModel } from './actor.js';
import { ListFollowersOptions } from './sql/instance-list-followers-query-builder.js';
import { ListFollowingOptions } from './sql/instance-list-following-query-builder.js';
export declare class ActorFollowModel extends SequelizeModel<ActorFollowModel> {
    state: FollowState;
    score: number;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    ActorFollower: Awaited<ActorModel>;
    targetActorId: number;
    ActorFollowing: Awaited<ActorModel>;
    static incrementFollowerAndFollowingCount(instance: ActorFollowModel, options: any): any;
    static decrementFollowerAndFollowingCount(instance: ActorFollowModel, options: any): any;
    static getSQLAttributes(tableName: string, aliasPrefix?: string): string[];
    static findOrCreate(): any;
    static findOrCreateCustom(options: {
        byActor: MActor;
        targetActor: MActor;
        activityId: string;
        state: FollowState;
        transaction: Transaction;
    }): Promise<[MActorFollowActors, boolean]>;
    static removeFollowsOf(actorId: number, t?: Transaction): Promise<number>;
    static removeBadActorFollows(): Promise<void>;
    static isFollowedBy(actorId: number, followerActorId: number): Promise<boolean>;
    static loadByActorAndTarget(actorId: number, targetActorId: number, t?: Transaction): Promise<MActorFollowActorsDefault>;
    static loadByActorAndTargetNameAndHostForAPI(options: {
        actorId: number;
        targetName: string;
        targetHost: string;
        state?: FollowState;
        transaction?: Transaction;
    }): Promise<MActorFollowActorsDefaultSubscription>;
    static listSubscriptionsOf(actorId: number, targets: {
        name: string;
        host?: string;
    }[]): Promise<MActorFollowFollowingHost[]>;
    static listInstanceFollowingForApi(options: ListFollowingOptions): Promise<{
        total: any;
        data: MActorFollowActorsDefault[];
    }>;
    static listFollowersForApi(options: ListFollowersOptions): Promise<{
        total: any;
        data: MActorFollowActorsDefault[];
    }>;
    static listSubscriptionsForApi(options: {
        actorId: number;
        start: number;
        count: number;
        sort: string;
        search?: string;
    }): Promise<{
        total: number;
        data: import("../../types/models/index.js").MChannelAccountActor[];
    }>;
    static keepUnfollowedInstance(hosts: string[]): Promise<string[]>;
    static listAcceptedFollowerUrlsForAP(actorIds: number[], t: Transaction, start?: number, count?: number): Promise<{
        total: number;
        data: string[];
    }>;
    static listAcceptedFollowerSharedInboxUrls(actorIds: number[], t: Transaction): Promise<{
        total: number;
        data: string[];
    }>;
    static listAcceptedFollowersForExport(targetActorId: number): Promise<{
        createdAt: Date;
        followerHandle: string;
        followerUrl: string;
    }[]>;
    static listAcceptedFollowingUrlsForApi(actorIds: number[], t: Transaction, start?: number, count?: number): Promise<{
        total: number;
        data: string[];
    }>;
    static listAcceptedFollowingForExport(actorId: number): Promise<{
        createdAt: Date;
        followingHandle: string;
        followingUrl: string;
    }[]>;
    static getStats(): Promise<{
        totalInstanceFollowing: number;
        totalInstanceFollowers: number;
    }>;
    static updateScore(inboxUrl: string, value: number, t?: Transaction): Promise<[unknown[], unknown]>;
    static updateScoreByFollowingServers(serverIds: number[], value: number, t?: Transaction): Promise<[unknown[], unknown]>;
    private static createListAcceptedFollowForApiQuery;
    private static listBadActorFollows;
    toFormattedJSON(this: MActorFollowFormattable): ActorFollow;
}
//# sourceMappingURL=actor-follow.d.ts.map