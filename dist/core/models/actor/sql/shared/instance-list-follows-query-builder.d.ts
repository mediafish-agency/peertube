import { Sequelize } from 'sequelize';
import { AbstractRunQuery } from '../../../shared/index.js';
import { ActorFollowTableAttributes } from './actor-follow-table-attributes.js';
type BaseOptions = {
    sort: string;
    count: number;
    start: number;
};
export declare abstract class InstanceListFollowsQueryBuilder<T extends BaseOptions> extends AbstractRunQuery {
    protected readonly sequelize: Sequelize;
    protected readonly options: T;
    protected readonly tableAttributes: ActorFollowTableAttributes;
    protected innerQuery: string;
    constructor(sequelize: Sequelize, options: T);
    protected abstract getWhere(): string;
    protected getJoins(): string;
    protected getServerJoin(actorName: string): string;
    protected getAvatarsJoin(actorName: string): string;
    private buildInnerQuery;
    protected buildListQuery(): void;
    protected buildCountQuery(): void;
    private getInnerSelect;
    private getSelect;
    private getOrder;
}
export {};
//# sourceMappingURL=instance-list-follows-query-builder.d.ts.map