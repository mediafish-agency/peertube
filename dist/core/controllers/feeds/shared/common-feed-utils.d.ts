import { Feed } from '@peertube/feed';
import { CustomTag, CustomXMLNS, Person } from '@peertube/feed/lib/typings/index.js';
import { MAccountDefault, MChannelBannerAccountDefault, MVideoFullLight } from '../../../types/models/index.js';
import express from 'express';
export declare function initFeed(parameters: {
    name: string;
    description: string;
    imageUrl: string;
    isPodcast: boolean;
    link?: string;
    locked?: {
        isLocked: boolean;
        email: string;
    };
    author?: {
        name: string;
        link: string;
        imageUrl: string;
    };
    person?: Person[];
    resourceType?: 'videos' | 'video-comments';
    queryString?: string;
    medium?: string;
    stunServers?: string[];
    trackers?: string[];
    customXMLNS?: CustomXMLNS[];
    customTags?: CustomTag[];
}): Feed;
export declare function sendFeed(feed: Feed, req: express.Request, res: express.Response): express.Response<any>;
export declare function buildFeedMetadata(options: {
    videoChannel?: MChannelBannerAccountDefault;
    account?: MAccountDefault;
    video?: MVideoFullLight;
}): Promise<{
    name: string;
    userName: string;
    description: string;
    imageUrl: string;
    accountImageUrl: string;
    email: string;
    link: string;
    accountLink: string;
}>;
//# sourceMappingURL=common-feed-utils.d.ts.map