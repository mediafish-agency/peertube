import { Transaction } from 'sequelize';
import { MActorSignature, MVideoRedundancyVideo } from '../types/models/index.js';
import { Activity } from '@peertube/peertube-models';
declare function removeVideoRedundancy(videoRedundancy: MVideoRedundancyVideo, t?: Transaction): Promise<void>;
declare function removeRedundanciesOfServer(serverId: number): Promise<void>;
declare function isRedundancyAccepted(activity: Activity, byActor: MActorSignature): Promise<boolean>;
export { isRedundancyAccepted, removeRedundanciesOfServer, removeVideoRedundancy };
//# sourceMappingURL=redundancy.d.ts.map