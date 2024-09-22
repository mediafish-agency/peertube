export declare function isActorEndpointsObjectValid(endpointObject: any): boolean;
export declare function isActorPublicKeyObjectValid(publicKeyObject: any): boolean;
export declare function isActorTypeValid(type: string): boolean;
export declare function isActorPublicKeyValid(publicKey: string): boolean;
export declare const actorNameAlphabet = "[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\\-_.:]";
export declare function isActorPreferredUsernameValid(preferredUsername: string): boolean;
export declare function isActorPrivateKeyValid(privateKey: string): boolean;
export declare function isActorFollowingCountValid(value: string): boolean;
export declare function isActorFollowersCountValid(value: string): boolean;
export declare function isActorDeleteActivityValid(activity: any): boolean;
export declare function sanitizeAndCheckActorObject(actor: any): boolean;
export declare function normalizeActor(actor: any): void;
export declare function isValidActorHandle(handle: string): boolean;
export declare function areValidActorHandles(handles: string[]): boolean;
export declare function setValidDescription(obj: any): boolean;
//# sourceMappingURL=actor.d.ts.map