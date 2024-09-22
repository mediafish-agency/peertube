import { AttributesOnly } from '@peertube/peertube-typescript-utils';
import { Model } from 'sequelize-typescript';
export declare abstract class SequelizeModel<T> extends Model<Partial<AttributesOnly<T>>> {
    id: number;
}
//# sourceMappingURL=sequelize-type.d.ts.map