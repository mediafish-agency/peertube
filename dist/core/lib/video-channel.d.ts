import * as Sequelize from 'sequelize';
import { VideoChannelCreate } from '@peertube/peertube-models';
import { VideoChannelModel } from '../models/video/video-channel.js';
import { MAccountId, MChannelId } from '../types/models/index.js';
declare function createLocalVideoChannelWithoutKeys(videoChannelInfo: VideoChannelCreate, account: MAccountId, t: Sequelize.Transaction): Promise<VideoChannelModel>;
declare function federateAllVideosOfChannel(videoChannel: MChannelId): Promise<void>;
export { createLocalVideoChannelWithoutKeys, federateAllVideosOfChannel };
//# sourceMappingURL=video-channel.d.ts.map