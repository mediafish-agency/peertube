import express from 'express';
import { MStreamingPlaylist, MVideo } from '../../types/models/index.js';
export declare function proxifyWebVideoFile(options: {
    req: express.Request;
    res: express.Response;
    filename: string;
}): Promise<void | express.Response<any>>;
export declare function proxifyHLS(options: {
    req: express.Request;
    res: express.Response;
    playlist: MStreamingPlaylist;
    video: MVideo;
    filename: string;
    reinjectVideoFileToken: boolean;
}): Promise<void | express.Response<any>>;
//# sourceMappingURL=proxy.d.ts.map