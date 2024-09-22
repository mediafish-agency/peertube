import { Transaction } from 'sequelize';
import { MActor, MActorFollowActors, MActorLight, MVideo, MVideoAccountLight, MVideoRedundancyVideo, MVideoShare } from '../../../types/models/index.js';
declare function sendUndoFollow(actorFollow: MActorFollowActors, t: Transaction): void;
declare function sendUndoAnnounce(byActor: MActorLight, videoShare: MVideoShare, video: MVideo, transaction: Transaction): Promise<any>;
declare function sendUndoCacheFile(byActor: MActor, redundancyModel: MVideoRedundancyVideo, transaction: Transaction): Promise<any>;
declare function sendUndoLike(byActor: MActor, video: MVideoAccountLight, t: Transaction): Promise<any>;
declare function sendUndoDislike(byActor: MActor, video: MVideoAccountLight, t: Transaction): Promise<any>;
export { sendUndoFollow, sendUndoLike, sendUndoDislike, sendUndoAnnounce, sendUndoCacheFile };
//# sourceMappingURL=send-undo.d.ts.map