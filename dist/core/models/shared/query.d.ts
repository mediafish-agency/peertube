import { BindOrReplacements, Sequelize, Transaction } from 'sequelize';
import { Fn } from 'sequelize/types/utils';
declare function doesExist(options: {
    sequelize: Sequelize;
    query: string;
    bind?: BindOrReplacements;
    transaction?: Transaction;
}): Promise<boolean>;
declare function createSimilarityAttribute(col: string, value: string): Fn;
declare function buildWhereIdOrUUID(id: number | string): {
    id: string | number;
    uuid?: undefined;
} | {
    uuid: string | number;
    id?: undefined;
};
declare function parseAggregateResult(result: any): number;
declare function parseRowCountResult(result: any): any;
declare function createSafeIn(sequelize: Sequelize, toEscape: (string | number)[], additionalUnescaped?: string[]): string;
declare function searchAttribute(sourceField?: string, targetField?: string): {
    [x: string]: {
        [x: number]: string;
    };
};
export { buildWhereIdOrUUID, createSafeIn, createSimilarityAttribute, doesExist, parseAggregateResult, parseRowCountResult, searchAttribute };
//# sourceMappingURL=query.d.ts.map