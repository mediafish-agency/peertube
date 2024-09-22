import { ContextType } from '@peertube/peertube-models';
import { buildDigest } from './peertube-crypto.js';
import type { signJsonLDObject } from './peertube-jsonld.js';
export type ContextFilter = <T>(arg: T) => Promise<T>;
export declare function buildGlobalHTTPHeaders(body: any, digestBuilder: typeof buildDigest): {
    digest: string;
    'content-type': string;
    accept: string;
};
export declare function activityPubContextify<T>(data: T, type: ContextType, contextFilter: ContextFilter): Promise<{
    '@context': (string | {
        [id: string]: string;
    })[];
} & T>;
export declare function signAndContextify<T>(options: {
    byActor: {
        url: string;
        privateKey: string;
    };
    data: T;
    contextType: ContextType | null;
    contextFilter: ContextFilter;
    signerFunction: typeof signJsonLDObject<T>;
}): Promise<T & {
    signature: {
        type: string;
        creator: string;
        created: string;
    };
}>;
export declare function getApplicationActorOfHost(host: string): Promise<string>;
export declare function getAPPublicValue(): 'https://www.w3.org/ns/activitystreams#Public';
export declare function hasAPPublic(toOrCC: string[]): boolean;
type ContextValue = {
    [id: string]: (string | {
        '@type': string;
        '@id': string;
    });
};
export declare function getAllContext(): (string | ContextValue)[];
export {};
//# sourceMappingURL=activity-pub-utils.d.ts.map