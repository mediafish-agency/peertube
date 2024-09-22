import express from 'express';
export declare class VideoHtml {
    static getWatchVideoHTML(videoIdArg: string, req: express.Request, res: express.Response): Promise<string>;
    static getEmbedVideoHTML(videoIdArg: string): Promise<string>;
    private static buildVideoHTML;
    private static getOEmbedUrl;
}
//# sourceMappingURL=video-html.d.ts.map