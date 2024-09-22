import { Transaction } from 'sequelize';
import { MActorFollowActors } from '../../types/models/index.js';
declare function autoFollowBackIfNeeded(actorFollow: MActorFollowActors, transaction?: Transaction): Promise<void>;
declare function getRemoteNameAndHost(handleOrHost: string): {
    name: string;
    host: string;
};
export { autoFollowBackIfNeeded, getRemoteNameAndHost };
//# sourceMappingURL=follow.d.ts.map