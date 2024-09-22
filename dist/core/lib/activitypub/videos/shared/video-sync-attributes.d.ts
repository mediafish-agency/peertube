import { VideoObject } from '@peertube/peertube-models';
import { MVideo } from '../../../../types/models/index.js';
export type SyncParam = {
    rates: boolean;
    shares: boolean;
    comments: boolean;
    refreshVideo?: boolean;
};
export declare function syncVideoExternalAttributes(video: MVideo, fetchedVideo: VideoObject, syncParam: Pick<SyncParam, 'rates' | 'shares' | 'comments'>): Promise<void>;
export declare function updateVideoRates(video: MVideo, fetchedVideo: VideoObject): Promise<void>;
//# sourceMappingURL=video-sync-attributes.d.ts.map