import { Transaction } from 'sequelize';
import { MChannelActorLight, MVideo, MVideoAccountLight, MVideoId } from '../../types/models/video/index.js';
export declare function changeVideoChannelShare(video: MVideoAccountLight, oldVideoChannel: MChannelActorLight, t: Transaction): Promise<void>;
export declare function addVideoShares(shareUrls: string[], video: MVideoId): Promise<void>;
export declare function shareByServer(video: MVideo, t: Transaction): Promise<any>;
export declare function shareByVideoChannel(video: MVideoAccountLight, t: Transaction): Promise<any>;
//# sourceMappingURL=share.d.ts.map