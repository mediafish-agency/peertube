import { Transaction } from 'sequelize';
import { ActivityAudience, ActivityLike } from '@peertube/peertube-models';
import { MActor, MActorAudience, MVideoAccountLight, MVideoUrl } from '../../../types/models/index.js';
declare function sendLike(byActor: MActor, video: MVideoAccountLight, transaction: Transaction): Promise<any>;
declare function buildLikeActivity(url: string, byActor: MActorAudience, video: MVideoUrl, audience?: ActivityAudience): ActivityLike;
export { sendLike, buildLikeActivity };
//# sourceMappingURL=send-like.d.ts.map