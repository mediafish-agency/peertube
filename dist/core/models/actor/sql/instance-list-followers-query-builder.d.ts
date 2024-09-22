import { Sequelize } from 'sequelize';
import { MActorFollowActorsDefault } from '../../../types/models/index.js';
import { ActivityPubActorType, FollowState } from '@peertube/peertube-models';
import { InstanceListFollowsQueryBuilder } from './shared/instance-list-follows-query-builder.js';
export interface ListFollowersOptions {
    actorIds: number[];
    start: number;
    count: number;
    sort: string;
    state?: FollowState;
    actorType?: ActivityPubActorType;
    search?: string;
}
export declare class InstanceListFollowersQueryBuilder extends InstanceListFollowsQueryBuilder<ListFollowersOptions> {
    protected readonly sequelize: Sequelize;
    protected readonly options: ListFollowersOptions;
    constructor(sequelize: Sequelize, options: ListFollowersOptions);
    listFollowers(): Promise<MActorFollowActorsDefault[]>;
    countFollowers(): Promise<any>;
    protected getWhere(): string;
}
//# sourceMappingURL=instance-list-followers-query-builder.d.ts.map