import { Request } from 'express';
import { MActor } from '../types/models/index.js';
declare function createPrivateAndPublicKeys(): Promise<{
    publicKey: string;
    privateKey: string;
}>;
declare function comparePassword(plainPassword: string, hashPassword: string): Promise<boolean>;
declare function cryptPassword(password: string): Promise<string>;
declare function isHTTPSignatureDigestValid(rawBody: Buffer, req: Request): boolean;
declare function isHTTPSignatureVerified(httpSignatureParsed: any, actor: MActor): boolean;
declare function parseHTTPSignature(req: Request, clockSkew?: number): any;
declare function buildDigest(body: any): string;
declare function encrypt(str: string, secret: string): Promise<string>;
declare function decrypt(encryptedArg: string, secret: string): Promise<string>;
export { isHTTPSignatureDigestValid, parseHTTPSignature, isHTTPSignatureVerified, buildDigest, comparePassword, createPrivateAndPublicKeys, cryptPassword, encrypt, decrypt };
//# sourceMappingURL=peertube-crypto.d.ts.map