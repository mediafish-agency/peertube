import { Transaction } from 'sequelize';
import { VideoRateType } from '@peertube/peertube-models';
import { MAccountActor, MActorUrl, MVideoFullLight, MVideoId } from '../../types/models/index.js';
declare function sendVideoRateChange(account: MAccountActor, video: MVideoFullLight, likes: number, dislikes: number, t: Transaction): Promise<void>;
declare function getLocalRateUrl(rateType: VideoRateType, actor: MActorUrl, video: MVideoId): string;
export { getLocalRateUrl, sendVideoRateChange };
//# sourceMappingURL=video-rates.d.ts.map