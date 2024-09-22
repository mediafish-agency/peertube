import { Transaction } from 'sequelize';
import { ActivityFollow } from '@peertube/peertube-models';
import { MActor, MActorFollowActors } from '../../../types/models/index.js';
declare function sendFollow(actorFollow: MActorFollowActors, t: Transaction): void;
declare function buildFollowActivity(url: string, byActor: MActor, targetActor: MActor): ActivityFollow;
export { sendFollow, buildFollowActivity };
//# sourceMappingURL=send-follow.d.ts.map