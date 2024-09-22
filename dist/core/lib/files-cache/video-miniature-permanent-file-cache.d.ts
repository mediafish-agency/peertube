import { MThumbnail } from '../../types/models/index.js';
import { AbstractPermanentFileCache } from './shared/index.js';
export declare class VideoMiniaturePermanentFileCache extends AbstractPermanentFileCache<MThumbnail> {
    constructor();
    protected loadModel(filename: string): Promise<MThumbnail>;
    protected getImageSize(image: MThumbnail): {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=video-miniature-permanent-file-cache.d.ts.map