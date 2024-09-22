import express from 'express';
declare const trackerRouter: import("express-serve-static-core").Router;
declare function createWebsocketTrackerServer(app: express.Application): {
    server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
    trackerServer: any;
};
export { trackerRouter, createWebsocketTrackerServer };
//# sourceMappingURL=tracker.d.ts.map