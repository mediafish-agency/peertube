import { Transaction } from 'sequelize';
import { ActorModel } from '../../../models/actor/actor.js';
import { MCommentOwnerVideo, MVideoAccountLight, MVideoPlaylistFullSummary } from '../../../types/models/video/index.js';
declare function sendDeleteVideo(video: MVideoAccountLight, transaction: Transaction): Promise<any>;
declare function sendDeleteActor(byActor: ActorModel, transaction: Transaction): Promise<any>;
declare function sendDeleteVideoComment(videoComment: MCommentOwnerVideo, transaction: Transaction): Promise<any>;
declare function sendDeleteVideoPlaylist(videoPlaylist: MVideoPlaylistFullSummary, transaction: Transaction): Promise<any>;
export { sendDeleteVideo, sendDeleteActor, sendDeleteVideoComment, sendDeleteVideoPlaylist };
//# sourceMappingURL=send-delete.d.ts.map