import { Sequelize, Transaction } from 'sequelize';
export declare class AbstractRunQuery {
    protected readonly sequelize: Sequelize;
    protected query: string;
    protected replacements: any;
    protected queryConfig: string;
    constructor(sequelize: Sequelize);
    protected runQuery(options?: {
        nest?: boolean;
        transaction?: Transaction;
        logging?: boolean;
    }): Promise<any[]>;
    protected buildSelect(entities: string[]): string;
}
//# sourceMappingURL=abstract-run-query.d.ts.map