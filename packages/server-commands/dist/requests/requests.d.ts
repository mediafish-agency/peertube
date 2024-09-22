import request from 'supertest';
import { HttpStatusCodeType } from '@peertube/peertube-models';
export type CommonRequestParams = {
    url: string;
    path?: string;
    contentType?: string;
    responseType?: string;
    range?: string;
    redirects?: number;
    accept?: string;
    host?: string;
    token?: string;
    headers?: {
        [name: string]: string;
    };
    type?: string;
    xForwardedFor?: string;
    expectedStatus?: HttpStatusCodeType;
};
export declare function makeRawRequest(options: {
    url: string;
    token?: string;
    expectedStatus?: HttpStatusCodeType;
    responseType?: string;
    range?: string;
    query?: {
        [id: string]: string;
    };
    method?: 'GET' | 'POST';
    accept?: string;
    headers?: {
        [name: string]: string;
    };
    redirects?: number;
}): request.Test;
export declare const makeFileRequest: (url: string) => request.Test;
export declare function makeGetRequest(options: CommonRequestParams & {
    query?: any;
    rawQuery?: string;
}): request.Test;
export declare function makeHTMLRequest(url: string, path: string): request.Test;
export declare function makeActivityPubGetRequest(url: string, path: string, expectedStatus?: HttpStatusCodeType): request.Test;
export declare function makeActivityPubRawRequest(url: string, expectedStatus?: HttpStatusCodeType): request.Test;
export declare function makeDeleteRequest(options: CommonRequestParams & {
    query?: any;
    rawQuery?: string;
}): request.Test;
export declare function makeUploadRequest(options: CommonRequestParams & {
    method?: 'POST' | 'PUT';
    fields: {
        [fieldName: string]: any;
    };
    attaches?: {
        [attachName: string]: any | any[];
    };
}): request.SuperTestStatic.Test;
export declare function makePostBodyRequest(options: CommonRequestParams & {
    fields?: {
        [fieldName: string]: any;
    };
}): request.Test;
export declare function makePutBodyRequest(options: {
    url: string;
    path: string;
    token?: string;
    fields: {
        [fieldName: string]: any;
    };
    expectedStatus?: HttpStatusCodeType;
    headers?: {
        [name: string]: string;
    };
}): request.Test;
export declare function getRedirectionUrl(url: string, token?: string): Promise<string>;
export declare function decodeQueryString(path: string): import("querystring").ParsedUrlQuery;
export declare function unwrapBody<T>(test: request.Test): Promise<T>;
export declare function unwrapText(test: request.Test): Promise<string>;
export declare function unwrapBodyOrDecodeToJSON<T>(test: request.Test): Promise<T>;
export declare function unwrapTextOrDecode(test: request.Test): Promise<string>;
//# sourceMappingURL=requests.d.ts.map