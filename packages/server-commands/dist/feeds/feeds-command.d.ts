import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
type FeedType = 'videos' | 'video-comments' | 'subscriptions';
export declare class FeedCommand extends AbstractCommand {
    getXML(options: OverrideCommandOptions & {
        feed: FeedType;
        ignoreCache: boolean;
        format?: string;
    }): Promise<string>;
    getPodcastXML(options: OverrideCommandOptions & {
        ignoreCache: boolean;
        channelId: number;
    }): Promise<string>;
    getJSON(options: OverrideCommandOptions & {
        feed: FeedType;
        ignoreCache: boolean;
        query?: {
            [id: string]: any;
        };
    }): Promise<string>;
}
export {};
//# sourceMappingURL=feeds-command.d.ts.map