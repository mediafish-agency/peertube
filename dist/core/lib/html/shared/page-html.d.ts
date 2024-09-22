import express from 'express';
import { HTMLServerConfig } from '@peertube/peertube-models';
export declare class PageHtml {
    private static htmlCache;
    static invalidateCache(): void;
    static getDefaultHTML(req: express.Request, res: express.Response, paramLang?: string): Promise<string>;
    static getEmbedHTML(): Promise<string>;
    static getIndexHTML(req: express.Request, res: express.Response, paramLang?: string): Promise<string>;
    private static getEmbedHTMLPath;
    private static getIndexHTMLPath;
    static addCustomCSS(htmlStringPage: string): string;
    static addServerConfig(htmlStringPage: string, serverConfig: HTMLServerConfig): string;
    static addAsyncPluginCSS(htmlStringPage: string): Promise<string>;
    private static addManifestContentHash;
    private static addFaviconContentHash;
    private static addLogoContentHash;
}
//# sourceMappingURL=page-html.d.ts.map