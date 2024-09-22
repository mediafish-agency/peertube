import { MActor } from '../types/models/index.js';
type ExpressRequest = {
    body: any;
};
export declare function compactJSONLDAndCheckSignature(fromActor: MActor, req: ExpressRequest): Promise<boolean>;
export declare function compactJSONLDAndCheckRSA2017Signature(fromActor: MActor, req: ExpressRequest): Promise<boolean>;
export declare function signJsonLDObject<T>(options: {
    byActor: {
        url: string;
        privateKey: string;
    };
    data: T;
    disableWorkerThreadAssertion?: boolean;
}): Promise<T & {
    signature: {
        type: string;
        creator: string;
        created: string;
    };
}>;
export {};
//# sourceMappingURL=peertube-jsonld.d.ts.map