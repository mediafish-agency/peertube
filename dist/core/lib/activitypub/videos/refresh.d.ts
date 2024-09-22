import { VideoLoadByUrlType } from '../../model-loaders/index.js';
import { MVideoThumbnail } from '../../../types/models/index.js';
import { SyncParam } from './shared/index.js';
declare function refreshVideoIfNeeded(options: {
    video: MVideoThumbnail;
    fetchedType: VideoLoadByUrlType;
    syncParam: SyncParam;
}): Promise<MVideoThumbnail>;
export { refreshVideoIfNeeded };
//# sourceMappingURL=refresh.d.ts.map