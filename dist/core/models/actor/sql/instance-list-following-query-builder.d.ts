import { Sequelize } from 'sequelize';
import { MActorFollowActorsDefault } from '../../../types/models/index.js';
import { ActivityPubActorType, FollowState } from '@peertube/peertube-models';
import { InstanceListFollowsQueryBuilder } from './shared/instance-list-follows-query-builder.js';
export interface ListFollowingOptions {
    followerId: number;
    start: number;
    count: number;
    sort: string;
    state?: FollowState;
    actorType?: ActivityPubActorType;
    search?: string;
}
export declare class InstanceListFollowingQueryBuilder extends InstanceListFollowsQueryBuilder<ListFollowingOptions> {
    protected readonly sequelize: Sequelize;
    protected readonly options: ListFollowingOptions;
    constructor(sequelize: Sequelize, options: ListFollowingOptions);
    listFollowing(): Promise<MActorFollowActorsDefault[]>;
    countFollowing(): Promise<any>;
    protected getWhere(): string;
}
//# sourceMappingURL=instance-list-following-query-builder.d.ts.map