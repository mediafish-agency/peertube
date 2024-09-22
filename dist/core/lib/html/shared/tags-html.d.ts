import { MVideo, MVideoPlaylist } from '../../../types/models/index.js';
type Tags = {
    indexationPolicy: 'always' | 'never';
    url?: string;
    ogType?: string;
    twitterCard?: 'player' | 'summary' | 'summary_large_image';
    schemaType?: string;
    jsonldProfile?: {
        createdAt: Date;
        updatedAt: Date;
    };
    list?: {
        numberOfItems: number;
    };
    escapedSiteName?: string;
    escapedTitle?: string;
    escapedTruncatedDescription?: string;
    image?: {
        url: string;
        width?: number;
        height?: number;
    };
    embed?: {
        url: string;
        createdAt: string;
        duration?: string;
        views?: number;
    };
    oembedUrl?: string;
};
type HookContext = {
    video?: MVideo;
    playlist?: MVideoPlaylist;
};
export declare class TagsHtml {
    static addTitleTag(htmlStringPage: string, title?: string): string;
    static addDescriptionTag(htmlStringPage: string, escapedTruncatedDescription?: string): string;
    static addTags(htmlStringPage: string, tagsValues: Tags, context: HookContext): Promise<string>;
    static generateOpenGraphMetaTagsOptions(tags: Tags): {};
    static generateStandardMetaTagsOptions(tags: Tags): {
        name: string;
        description: string;
        image: string;
    };
    static generateTwitterCardMetaTagsOptions(tags: Tags): {};
    static generateSchemaTagsOptions(tags: Tags, context: HookContext): Promise<{
        '@context': string;
        '@type': string;
        dateCreated: string;
        dateModified: string;
        mainEntity: {
            '@id': string;
            '@type': string;
            name: string;
            description: string;
            image: string;
        };
    }> | Promise<{
        '@context': string;
        '@type': string;
        name: string;
        description: string;
        image: string;
        url: string;
    }>;
    static buildEscapedTruncatedDescription(description: string): string;
}
export {};
//# sourceMappingURL=tags-html.d.ts.map