import { Transaction } from 'sequelize';
import { MServer, MServerFormattable } from '../../types/models/server/index.js';
import { ActorModel } from '../actor/actor.js';
import { SequelizeModel } from '../shared/index.js';
import { ServerBlocklistModel } from './server-blocklist.js';
export declare class ServerModel extends SequelizeModel<ServerModel> {
    host: string;
    redundancyAllowed: boolean;
    createdAt: Date;
    updatedAt: Date;
    Actors: Awaited<ActorModel>[];
    BlockedBy: Awaited<ServerBlocklistModel>[];
    static getSQLAttributes(tableName: string, aliasPrefix?: string): string[];
    static load(id: number, transaction?: Transaction): Promise<MServer>;
    static loadByHost(host: string): Promise<MServer>;
    static loadOrCreateByHost(host: string): Promise<MServer>;
    isBlocked(): boolean;
    toFormattedJSON(this: MServerFormattable): {
        host: string;
    };
}
//# sourceMappingURL=server.d.ts.map