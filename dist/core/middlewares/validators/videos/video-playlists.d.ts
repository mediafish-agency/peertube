import express from 'express';
import { ValidationChain } from 'express-validator';
import { ExpressPromiseHandler } from '../../../types/express-handler.js';
import { VideoPlaylistFetchType } from '../shared/index.js';
declare const videoPlaylistsAddValidator: (ValidationChain | ExpressPromiseHandler)[];
declare const videoPlaylistsUpdateValidator: (ValidationChain | ExpressPromiseHandler)[];
declare const videoPlaylistsDeleteValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoPlaylistsGetValidator: (fetchType: VideoPlaylistFetchType) => (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoPlaylistsSearchValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const videoPlaylistsAddVideoValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoPlaylistsUpdateOrRemoveVideoValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoPlaylistElementAPGetValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const videoPlaylistsReorderVideosValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const commonVideoPlaylistFiltersValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const doVideosInPlaylistExistValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export { videoPlaylistsAddValidator, videoPlaylistsUpdateValidator, videoPlaylistsDeleteValidator, videoPlaylistsGetValidator, videoPlaylistsSearchValidator, videoPlaylistsAddVideoValidator, videoPlaylistsUpdateOrRemoveVideoValidator, videoPlaylistsReorderVideosValidator, videoPlaylistElementAPGetValidator, commonVideoPlaylistFiltersValidator, doVideosInPlaylistExistValidator };
//# sourceMappingURL=video-playlists.d.ts.map