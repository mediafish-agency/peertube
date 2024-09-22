import { Transaction } from 'sequelize';
import { MActorId, MVideoWithAllFiles } from '../../types/models/index.js';
import { CacheFileObject } from '@peertube/peertube-models';
import { VideoRedundancyModel } from '../../models/redundancy/video-redundancy.js';
declare function createOrUpdateCacheFile(cacheFileObject: CacheFileObject, video: MVideoWithAllFiles, byActor: MActorId, t: Transaction): Promise<VideoRedundancyModel>;
export { createOrUpdateCacheFile };
//# sourceMappingURL=cache-file.d.ts.map