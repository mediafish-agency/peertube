import { Sequelize } from 'sequelize';
import { AbstractRunQuery } from '../../shared/index.js';
import { UserNotificationModelForApi } from '../../../types/models/index.js';
export interface ListNotificationsOptions {
    userId: number;
    unread?: boolean;
    sort: string;
    offset: number;
    limit: number;
}
export declare class UserNotificationListQueryBuilder extends AbstractRunQuery {
    protected readonly sequelize: Sequelize;
    private readonly options;
    private innerQuery;
    constructor(sequelize: Sequelize, options: ListNotificationsOptions);
    listNotifications(): Promise<UserNotificationModelForApi[]>;
    private buildInnerQuery;
    private buildQuery;
    private getWhere;
    private getOrder;
    private getSelect;
    private getJoins;
}
//# sourceMappingURL=user-notitication-list-query-builder.d.ts.map