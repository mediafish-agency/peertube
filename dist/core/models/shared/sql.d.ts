import { Model, ModelStatic } from 'sequelize';
import { Literal } from 'sequelize/types/utils';
import { AttributesOnly } from '@peertube/peertube-typescript-utils';
export declare function buildLocalAccountIdsIn(): Literal;
export declare function buildLocalActorIdsIn(): Literal;
export declare function buildBlockedAccountSQL(blockerIds: number[]): string;
export declare function buildServerIdsFollowedBy(actorId: any): string;
export declare function buildSQLAttributes<M extends Model>(options: {
    model: ModelStatic<M>;
    tableName: string;
    excludeAttributes?: Exclude<keyof AttributesOnly<M>, symbol>[];
    aliasPrefix?: string;
    idBuilder?: string[];
}): string[];
//# sourceMappingURL=sql.d.ts.map