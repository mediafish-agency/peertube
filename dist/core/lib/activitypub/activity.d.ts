import { PeerTubeRequestOptions } from '../../helpers/requests.js';
import { ActivityObject, ActivityPubActor, ActivityType, APObjectId } from '@peertube/peertube-models';
export declare function getAPId(object: string | {
    id: string;
}): string;
export declare function getActivityStreamDuration(duration: number): string;
export declare function getDurationFromActivityStream(duration: string): number;
export declare function buildAvailableActivities(): ActivityType[];
export declare function fetchAP<T>(url: string, moreOptions?: PeerTubeRequestOptions): Promise<import("got").Response<T>>;
export declare function fetchAPObjectIfNeeded<T extends (ActivityObject | ActivityPubActor)>(object: APObjectId): Promise<Exclude<T, string>>;
export declare function findLatestAPRedirection(url: string, iteration?: number): Promise<string>;
//# sourceMappingURL=activity.d.ts.map