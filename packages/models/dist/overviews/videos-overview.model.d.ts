import { Video, VideoChannelSummary, VideoConstant } from '../videos/index.js';
export interface ChannelOverview {
    channel: VideoChannelSummary;
    videos: Video[];
}
export interface CategoryOverview {
    category: VideoConstant<number>;
    videos: Video[];
}
export interface TagOverview {
    tag: string;
    videos: Video[];
}
export interface VideosOverview {
    channels: ChannelOverview[];
    categories: CategoryOverview[];
    tags: TagOverview[];
}
//# sourceMappingURL=videos-overview.model.d.ts.map