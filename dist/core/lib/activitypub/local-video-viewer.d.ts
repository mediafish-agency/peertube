import { Transaction } from 'sequelize';
import { MVideo } from '../../types/models/index.js';
import { WatchActionObject } from '@peertube/peertube-models';
declare function createOrUpdateLocalVideoViewer(watchAction: WatchActionObject, video: MVideo, t: Transaction): Promise<void>;
export { createOrUpdateLocalVideoViewer };
//# sourceMappingURL=local-video-viewer.d.ts.map