import { Sequelize, Model as SequelizeModel } from 'sequelize';
export declare class ModelBuilder<T extends SequelizeModel> {
    private readonly sequelize;
    private readonly modelRegistry;
    constructor(sequelize: Sequelize);
    createModels(jsonArray: any[], baseModelName: string): T[];
    private createModel;
    private createOrFindModel;
    private findModelBuilder;
    private buildSequelizeModelName;
    private getModelRegistryKey;
}
//# sourceMappingURL=model-builder.d.ts.map