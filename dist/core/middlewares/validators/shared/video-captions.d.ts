import { Response } from 'express';
import { MVideoId } from '../../../types/models/index.js';
declare function doesVideoCaptionExist(video: MVideoId, language: string, res: Response): Promise<boolean>;
export { doesVideoCaptionExist };
//# sourceMappingURL=video-captions.d.ts.map