import { Transaction } from 'sequelize';
import { ActivityAudience, ActivityDislike } from '@peertube/peertube-models';
import { MActor, MActorAudience, MVideoAccountLight, MVideoUrl } from '../../../types/models/index.js';
declare function sendDislike(byActor: MActor, video: MVideoAccountLight, transaction: Transaction): Promise<any>;
declare function buildDislikeActivity(url: string, byActor: MActorAudience, video: MVideoUrl, audience?: ActivityAudience): ActivityDislike;
export { sendDislike, buildDislikeActivity };
//# sourceMappingURL=send-dislike.d.ts.map