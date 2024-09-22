import express from 'express';
import { Socket } from 'socket.io';
import { HttpStatusCodeType, ServerErrorCodeType } from '@peertube/peertube-models';
declare function authenticate(req: express.Request, res: express.Response, next: express.NextFunction): void;
declare function authenticateSocket(socket: Socket, next: (err?: any) => void): void;
declare function authenticatePromise(options: {
    req: express.Request;
    res: express.Response;
    errorMessage?: string;
    errorStatus?: HttpStatusCodeType;
    errorType?: ServerErrorCodeType;
}): Promise<void>;
declare function optionalAuthenticate(req: express.Request, res: express.Response, next: express.NextFunction): void;
declare function authenticateRunnerSocket(socket: Socket, next: (err?: any) => void): void;
export { authenticate, authenticateSocket, authenticatePromise, optionalAuthenticate, authenticateRunnerSocket };
//# sourceMappingURL=auth.d.ts.map