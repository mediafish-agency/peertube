import { VideoObject } from '@peertube/peertube-models';
import { LoggerTagsFn } from '../../../helpers/logger.js';
import { MVideoAccountLightBlacklistAllFiles, MVideoFullLight } from '../../../types/models/index.js';
import { APVideoAbstractBuilder } from './shared/index.js';
export declare class APVideoUpdater extends APVideoAbstractBuilder {
    protected readonly videoObject: VideoObject;
    private readonly video;
    private readonly wasPrivateVideo;
    private readonly wasUnlistedVideo;
    private readonly oldVideoChannel;
    protected lTags: LoggerTagsFn;
    constructor(videoObject: VideoObject, video: MVideoAccountLightBlacklistAllFiles);
    update(overrideTo?: string[]): Promise<MVideoFullLight>;
    private checkChannelUpdateOrThrow;
    private updateVideo;
    private setCaptions;
    private setStoryboard;
    private setOrDeleteLive;
    private catchUpdateError;
}
//# sourceMappingURL=updater.d.ts.map