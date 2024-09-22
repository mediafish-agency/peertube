export type YoutubeDLInfo = {
    name?: string;
    description?: string;
    category?: number;
    language?: string;
    licence?: number;
    nsfw?: boolean;
    tags?: string[];
    thumbnailUrl?: string;
    ext?: string;
    originallyPublishedAtWithoutTime?: Date;
    webpageUrl?: string;
    urls?: string[];
    chapters?: {
        timecode: number;
        title: string;
    }[];
};
export declare class YoutubeDLInfoBuilder {
    private readonly info;
    constructor(info: any);
    getInfo(): YoutubeDLInfo;
    private normalizeObject;
    private buildOriginallyPublishedAt;
    private buildVideoInfo;
    private buildAvailableUrl;
    private titleTruncation;
    private descriptionTruncation;
    private isNSFW;
    private getTags;
    private getLicence;
    private getCategory;
    private getLanguage;
}
//# sourceMappingURL=youtube-dl-info-builder.d.ts.map