import express from 'express';
export declare class PlaylistHtml {
    static getWatchPlaylistHTML(videoPlaylistIdArg: string, req: express.Request, res: express.Response): Promise<string>;
    static getEmbedPlaylistHTML(playlistIdArg: string): Promise<string>;
    private static buildPlaylistHTML;
    private static getOEmbedUrl;
}
//# sourceMappingURL=playlist-html.d.ts.map