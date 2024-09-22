import express from 'express';
export declare class ActorHtml {
    static getAccountHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
    static getVideoChannelHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
    static getActorHTMLPage(nameWithHost: string, req: express.Request, res: express.Response): Promise<string>;
    private static getAccountOrChannelHTMLPage;
}
//# sourceMappingURL=actor-html.d.ts.map