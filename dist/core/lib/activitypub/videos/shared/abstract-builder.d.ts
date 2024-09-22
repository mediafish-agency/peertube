import { VideoObject } from '@peertube/peertube-models';
import { LoggerTagsFn } from '../../../../helpers/logger.js';
import { StoryboardModel } from '../../../../models/video/storyboard.js';
import { MVideo, MVideoFullLight, MVideoThumbnail } from '../../../../types/models/index.js';
import { Transaction } from 'sequelize';
export declare abstract class APVideoAbstractBuilder {
    protected abstract videoObject: VideoObject;
    protected abstract lTags: LoggerTagsFn;
    protected getOrCreateVideoChannelFromVideoObject(): Promise<import("../../../../types/models/index.js").MActorFullActor>;
    protected setThumbnail(video: MVideoThumbnail, t?: Transaction): Promise<any>;
    protected setPreview(video: MVideoFullLight, t?: Transaction): Promise<void>;
    protected setTags(video: MVideoFullLight, t: Transaction): Promise<void>;
    protected setTrackers(video: MVideoFullLight, t: Transaction): Promise<void>;
    protected insertOrReplaceCaptions(video: MVideoFullLight, t: Transaction): Promise<void>;
    protected insertOrReplaceStoryboard(video: MVideoFullLight, t: Transaction): Promise<StoryboardModel>;
    protected insertOrReplaceLive(video: MVideoFullLight, transaction: Transaction): Promise<void>;
    protected setWebVideoFiles(video: MVideoFullLight, t: Transaction): Promise<void>;
    protected updateChaptersOutsideTransaction(video: MVideoFullLight): Promise<void>;
    protected setStreamingPlaylists(video: MVideoFullLight, t: Transaction): Promise<void>;
    private insertOrReplaceStreamingPlaylist;
    private getStreamingPlaylistFiles;
    private setStreamingPlaylistFiles;
    protected setAutomaticTags(options: {
        video: MVideo;
        oldVideo?: Pick<MVideo, 'name' | 'description'>;
        transaction: Transaction;
    }): Promise<void>;
}
//# sourceMappingURL=abstract-builder.d.ts.map