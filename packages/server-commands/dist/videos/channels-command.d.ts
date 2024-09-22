import { ActorFollow, ResultList, VideoChannel, VideoChannelCreate, VideoChannelCreateResult, VideoChannelUpdate, VideosImportInChannelCreate } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class ChannelsCommand extends AbstractCommand {
    list(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        withStats?: boolean;
    }): Promise<ResultList<VideoChannel>>;
    listByAccount(options: OverrideCommandOptions & {
        accountName: string;
        start?: number;
        count?: number;
        sort?: string;
        withStats?: boolean;
        search?: string;
    }): Promise<ResultList<VideoChannel>>;
    create(options: OverrideCommandOptions & {
        attributes: Partial<VideoChannelCreate>;
    }): Promise<VideoChannelCreateResult>;
    update(options: OverrideCommandOptions & {
        channelName: string;
        attributes: VideoChannelUpdate;
    }): import("supertest").Test;
    delete(options: OverrideCommandOptions & {
        channelName: string;
    }): import("supertest").Test;
    get(options: OverrideCommandOptions & {
        channelName: string;
    }): Promise<VideoChannel>;
    updateImage(options: OverrideCommandOptions & {
        fixture: string;
        channelName: string | number;
        type: 'avatar' | 'banner';
    }): import("supertest").SuperTestStatic.Test;
    deleteImage(options: OverrideCommandOptions & {
        channelName: string | number;
        type: 'avatar' | 'banner';
    }): import("supertest").Test;
    listFollowers(options: OverrideCommandOptions & {
        channelName: string;
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
    }): Promise<ResultList<ActorFollow>>;
    importVideos(options: OverrideCommandOptions & VideosImportInChannelCreate & {
        channelName: string;
    }): import("supertest").Test;
}
//# sourceMappingURL=channels-command.d.ts.map