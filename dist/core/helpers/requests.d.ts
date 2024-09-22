import { OptionsInit, Response } from 'got';
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent';
export interface PeerTubeRequestError extends Error {
    statusCode?: number;
    responseBody?: any;
    responseHeaders?: any;
    requestHeaders?: any;
    requestUrl?: any;
    requestMethod?: any;
}
export type PeerTubeRequestOptions = {
    timeout?: number;
    activityPub?: boolean;
    bodyKBLimit?: number;
    httpSignature?: {
        algorithm: string;
        authorizationHeaderName: string;
        keyId: string;
        key: string;
        headers: string[];
    };
    jsonResponse?: boolean;
    followRedirect?: boolean;
} & Pick<OptionsInit, 'headers' | 'json' | 'method' | 'searchParams'>;
export declare const unsafeSSRFGot: import("got").Got;
export declare const peertubeGot: import("got").Got;
export declare function doRequest(url: string, options?: PeerTubeRequestOptions & {
    preventSSRF?: false;
}): Promise<Response<string>>;
export declare function doJSONRequest<T>(url: string, options?: PeerTubeRequestOptions & {
    preventSSRF?: false;
}): Promise<Response<T>>;
export declare function doRequestAndSaveToFile(url: string, destPath: string, options?: PeerTubeRequestOptions): Promise<void>;
export declare function generateRequestStream(url: string, options?: PeerTubeRequestOptions): import("got").Request;
export declare function getProxyAgent(): {
    agent?: undefined;
} | {
    agent: {
        http: HttpProxyAgent;
        https: HttpsProxyAgent;
    };
};
export declare function isBinaryResponse(result: Response<any>): boolean;
//# sourceMappingURL=requests.d.ts.map