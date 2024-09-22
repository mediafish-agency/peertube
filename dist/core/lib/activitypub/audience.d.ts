import { ActivityAudience } from '@peertube/peertube-models';
import { MActorFollowersUrl } from '../../types/models/index.js';
export declare function getAudience(actorSender: MActorFollowersUrl, isPublic?: boolean): {
    to: string[];
    cc: string[];
};
export declare function buildAudience(followerUrls: string[], isPublic?: boolean): {
    to: string[];
    cc: string[];
};
export declare function audiencify<T>(object: T, audience: ActivityAudience): {
    to: string[];
    cc: string[];
} & T;
//# sourceMappingURL=audience.d.ts.map