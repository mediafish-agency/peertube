import { Transaction } from 'sequelize';
import { ActivityAnnounce, ActivityAudience } from '@peertube/peertube-models';
import { MActorLight, MVideo } from '../../../types/models/index.js';
import { MVideoShare } from '../../../types/models/video/index.js';
declare function buildAnnounceWithVideoAudience(byActor: MActorLight, videoShare: MVideoShare, video: MVideo, t: Transaction): Promise<{
    activity: ActivityAnnounce;
    actorsInvolvedInVideo: (import("../../../types/models/index.js").MActorId & import("../../../types/models/index.js").MActorFollowersUrl)[];
}>;
declare function sendVideoAnnounce(byActor: MActorLight, videoShare: MVideoShare, video: MVideo, transaction: Transaction): Promise<any>;
declare function buildAnnounceActivity(url: string, byActor: MActorLight, object: string, audience?: ActivityAudience): ActivityAnnounce;
export { sendVideoAnnounce, buildAnnounceActivity, buildAnnounceWithVideoAudience };
//# sourceMappingURL=send-announce.d.ts.map