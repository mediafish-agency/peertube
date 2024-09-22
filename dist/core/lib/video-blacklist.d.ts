import { Transaction } from 'sequelize';
import { VideoBlacklistCreate } from '@peertube/peertube-models';
import { MUser, MVideoAccountLight, MVideoBlacklist, MVideoFullLight, MVideoWithBlacklistLight } from '../types/models/index.js';
declare function autoBlacklistVideoIfNeeded(parameters: {
    video: MVideoWithBlacklistLight;
    user?: MUser;
    isRemote: boolean;
    isNew: boolean;
    isNewFile: boolean;
    notify?: boolean;
    transaction?: Transaction;
}): Promise<boolean>;
declare function blacklistVideo(videoInstance: MVideoAccountLight, options: VideoBlacklistCreate): Promise<void>;
declare function unblacklistVideo(videoBlacklist: MVideoBlacklist, video: MVideoFullLight): Promise<void>;
export { autoBlacklistVideoIfNeeded, blacklistVideo, unblacklistVideo };
//# sourceMappingURL=video-blacklist.d.ts.map