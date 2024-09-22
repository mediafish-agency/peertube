import { ActivityAudience, ActivityCreate, ActivityCreateObject } from '@peertube/peertube-models';
import { Transaction } from 'sequelize';
import { MActorLight, MCommentOwnerVideoReply, MLocalVideoViewerWithWatchSections, MVideoAP, MVideoAccountLight, MVideoPlaylistFull, MVideoRedundancyFileVideo, MVideoRedundancyStreamingPlaylistVideo } from '../../../types/models/index.js';
export declare function sendCreateVideo(video: MVideoAP, transaction: Transaction): Promise<any>;
export declare function sendCreateCacheFile(byActor: MActorLight, video: MVideoAccountLight, fileRedundancy: MVideoRedundancyStreamingPlaylistVideo | MVideoRedundancyFileVideo): Promise<any>;
export declare function sendCreateWatchAction(stats: MLocalVideoViewerWithWatchSections, transaction: Transaction): Promise<any>;
export declare function sendCreateVideoPlaylist(playlist: MVideoPlaylistFull, transaction: Transaction): Promise<any>;
export declare function sendCreateVideoCommentIfNeeded(comment: MCommentOwnerVideoReply, transaction: Transaction): Promise<any>;
export declare function buildCreateActivity<T extends ActivityCreateObject>(url: string, byActor: MActorLight, object: T, audience?: ActivityAudience): ActivityCreate<T>;
//# sourceMappingURL=send-create.d.ts.map