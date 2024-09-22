import { Transaction } from 'sequelize';
import { MAccountDefault, MActor, MActorLight, MChannelDefault, MVideoAPLight, MVideoPlaylistFull, MVideoRedundancyVideo } from '../../../types/models/index.js';
export declare function sendUpdateVideo(videoArg: MVideoAPLight, transaction: Transaction, overriddenByActor?: MActor): Promise<any>;
export declare function sendUpdateActor(accountOrChannel: MChannelDefault | MAccountDefault, transaction: Transaction): Promise<any>;
export declare function sendUpdateCacheFile(byActor: MActorLight, redundancyModel: MVideoRedundancyVideo): Promise<any>;
export declare function sendUpdateVideoPlaylist(videoPlaylist: MVideoPlaylistFull, transaction: Transaction): Promise<any>;
//# sourceMappingURL=send-update.d.ts.map