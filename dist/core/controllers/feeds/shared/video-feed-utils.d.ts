import { VideoIncludeType } from '@peertube/peertube-models';
import { DisplayOnlyForFollowerOptions } from '../../../models/video/sql/video/index.js';
import { VideoModel } from '../../../models/video/video.js';
import { MUserDefault } from '../../../types/models/index.js';
export declare function getVideosForFeeds(options: {
    sort: string;
    nsfw: boolean;
    isLocal: boolean;
    include: VideoIncludeType;
    accountId?: number;
    videoChannelId?: number;
    displayOnlyForFollower?: DisplayOnlyForFollowerOptions;
    user?: MUserDefault;
}): Promise<VideoModel[]>;
export declare function getCommonVideoFeedAttributes(video: VideoModel): {
    title: string;
    link: string;
    description: any;
    content: any;
    date: Date;
    nsfw: boolean;
    category: {
        name: any;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
};
//# sourceMappingURL=video-feed-utils.d.ts.map