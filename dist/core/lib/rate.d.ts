import { MAccountId, MAccountUrl, MVideoFullLight } from '../types/models/index.js';
import { UserVideoRateType } from '@peertube/peertube-models';
export declare function userRateVideo(options: {
    rateType: UserVideoRateType;
    account: MAccountUrl & MAccountId;
    video: MVideoFullLight;
}): Promise<void>;
//# sourceMappingURL=rate.d.ts.map