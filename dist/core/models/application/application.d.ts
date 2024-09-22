import memoizee from 'memoizee';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
export declare const getServerActor: (() => Promise<import("../actor/actor.js").ActorModel>) & memoizee.Memoized<() => Promise<import("../actor/actor.js").ActorModel>>;
export declare class ApplicationModel extends SequelizeModel<ApplicationModel> {
    migrationVersion: number;
    latestPeerTubeVersion: string;
    nodeVersion: string;
    nodeABIVersion: number;
    Account: Awaited<AccountModel>;
    static countTotal(): Promise<number>;
    static load(): Promise<ApplicationModel>;
    static nodeABIChanged(): Promise<boolean>;
    static updateNodeVersions(): Promise<void>;
}
//# sourceMappingURL=application.d.ts.map