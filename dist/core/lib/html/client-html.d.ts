import express from 'express';
declare class ClientHtml {
    static invalidateCache(): void;
    static getDefaultHTMLPage(req: express.Request, res: express.Response, paramLang?: string): Promise<string>;
    static getWatchHTMLPage(videoIdArg: string, req: express.Request, res: express.Response): Promise<string>;
    static getVideoEmbedHTML(videoIdArg: string): Promise<string>;
    static getWatchPlaylistHTMLPage(videoPlaylistIdArg: string, req: express.Request, res: express.Response): Promise<string>;
    static getVideoPlaylistEmbedHTML(playlistIdArg: string): Promise<string>;
    static getAccountHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
    static getVideoChannelHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
    static getActorHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
}
declare function sendHTML(html: string, res: express.Response, localizedHTML?: boolean): express.Response<any>;
declare function serveIndexHTML(req: express.Request, res: express.Response): Promise<express.Response<any>>;
export { ClientHtml, sendHTML, serveIndexHTML };
//# sourceMappingURL=client-html.d.ts.map