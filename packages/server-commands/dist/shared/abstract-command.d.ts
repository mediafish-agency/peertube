import { HttpStatusCodeType } from '@peertube/peertube-models';
import { Response as GotResponse } from 'got';
import type { PeerTubeServer } from '../server/server.js';
export interface OverrideCommandOptions {
    token?: string;
    expectedStatus?: HttpStatusCodeType;
}
interface InternalCommonCommandOptions extends OverrideCommandOptions {
    url?: string;
    path: string;
    implicitToken: boolean;
    defaultExpectedStatus: HttpStatusCodeType;
    contentType?: string;
    accept?: string;
    redirects?: number;
    range?: string;
    host?: string;
    headers?: {
        [name: string]: string;
    };
    requestType?: string;
    responseType?: string;
    xForwardedFor?: string;
}
interface InternalGetCommandOptions extends InternalCommonCommandOptions {
    query?: {
        [id: string]: any;
    };
}
interface InternalDeleteCommandOptions extends InternalCommonCommandOptions {
    query?: {
        [id: string]: any;
    };
    rawQuery?: string;
}
export declare abstract class AbstractCommand {
    protected server: PeerTubeServer;
    constructor(server: PeerTubeServer);
    protected getRequestBody<T>(options: InternalGetCommandOptions): Promise<T>;
    protected getRequestText(options: InternalGetCommandOptions): Promise<string>;
    protected getRawRequest(options: Omit<InternalGetCommandOptions, 'path'>): import("supertest").Test;
    protected getRequest(options: InternalGetCommandOptions): import("supertest").Test;
    protected deleteRequest(options: InternalDeleteCommandOptions): import("supertest").Test;
    protected putBodyRequest(options: InternalCommonCommandOptions & {
        fields?: {
            [fieldName: string]: any;
        };
        headers?: {
            [name: string]: string;
        };
    }): import("supertest").Test;
    protected postBodyRequest(options: InternalCommonCommandOptions & {
        fields?: {
            [fieldName: string]: any;
        };
        headers?: {
            [name: string]: string;
        };
    }): import("supertest").Test;
    protected postUploadRequest(options: InternalCommonCommandOptions & {
        fields?: {
            [fieldName: string]: any;
        };
        attaches?: {
            [fieldName: string]: any;
        };
    }): import("supertest").SuperTestStatic.Test;
    protected putUploadRequest(options: InternalCommonCommandOptions & {
        fields?: {
            [fieldName: string]: any;
        };
        attaches?: {
            [fieldName: string]: any;
        };
    }): import("supertest").SuperTestStatic.Test;
    protected updateImageRequest(options: InternalCommonCommandOptions & {
        fixture: string;
        fieldname: string;
    }): import("supertest").SuperTestStatic.Test;
    protected buildCommonRequestOptions(options: InternalCommonCommandOptions): {
        url: string;
        path: string;
        token: string;
        expectedStatus: HttpStatusCodeType;
        redirects: number;
        contentType: string;
        range: string;
        host: string;
        accept: string;
        headers: {
            [name: string]: string;
        };
        type: string;
        responseType: string;
        xForwardedFor: string;
    };
    protected buildCommonRequestToken(options: Pick<InternalCommonCommandOptions, 'token' | 'implicitToken'>): string;
    protected buildExpectedStatus(options: Pick<InternalCommonCommandOptions, 'expectedStatus' | 'defaultExpectedStatus'>): HttpStatusCodeType;
    protected buildVideoPasswordHeader(videoPassword: string): {
        'x-peertube-video-password': string;
    };
    protected buildResumeUpload<T>(options: OverrideCommandOptions & {
        path: string;
        fixture: string;
        attaches?: Record<string, string>;
        fields?: Record<string, any>;
        completedExpectedStatus?: HttpStatusCodeType;
    }): Promise<T>;
    protected prepareResumableUpload(options: OverrideCommandOptions & {
        path: string;
        fixture: string;
        size: number;
        mimetype: string;
        attaches?: Record<string, string>;
        fields?: Record<string, any>;
        originalName?: string;
        lastModified?: number;
    }): Promise<import("superagent/lib/node/response.js")>;
    protected sendResumableChunks<T>(options: OverrideCommandOptions & {
        pathUploadId: string;
        path: string;
        videoFilePath: string;
        size: number;
        contentLength?: number;
        contentRangeBuilder?: (start: number, chunk: any) => string;
        digestBuilder?: (chunk: any) => string;
    }): Promise<GotResponse<T>>;
    protected endResumableUpload(options: OverrideCommandOptions & {
        path: string;
        pathUploadId: string;
    }): import("supertest").Test;
}
export {};
//# sourceMappingURL=abstract-command.d.ts.map