import { ContextType } from '@peertube/peertube-models';
type Payload<T> = {
    body: T;
    contextType: ContextType;
    signatureActorId?: number;
};
export declare function computeBody<T>(payload: Payload<T>): Promise<T | T & {
    type: 'RsaSignature2017';
    creator: string;
    created: string;
}>;
export declare function buildGlobalHTTPHeaders(body: any): Promise<{
    digest: string;
    'content-type': string;
    accept: string;
}>;
export declare function buildSignedRequestOptions(options: {
    signatureActorId?: number;
    hasPayload: boolean;
}): Promise<{
    algorithm: string;
    authorizationHeaderName: string;
    keyId: string;
    key: string;
    headers: string[];
}>;
export {};
//# sourceMappingURL=http.d.ts.map