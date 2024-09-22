import express from 'express';
import { MVideoId } from '../../../types/models/index.js';
declare function doesVideoCommentThreadExist(idArg: number | string, video: MVideoId, res: express.Response): Promise<boolean>;
declare function doesVideoCommentExist(idArg: number | string, video: MVideoId, res: express.Response): Promise<boolean>;
declare function doesCommentIdExist(idArg: number | string, res: express.Response): Promise<boolean>;
export { doesVideoCommentThreadExist, doesVideoCommentExist, doesCommentIdExist };
//# sourceMappingURL=video-comments.d.ts.map