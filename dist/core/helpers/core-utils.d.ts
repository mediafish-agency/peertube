import { ExecOptions } from 'child_process';
import { pipeline } from 'stream';
declare const objectConverter: (oldObject: any, keyConverter: (e: string) => string, valueConverter: (e: any) => any) => any;
declare function mapToJSON(map: Map<any, any>): any;
export declare function parseDurationToMs(duration: number | string): number;
export declare function parseBytes(value: string | number): number;
declare function sanitizeUrl(url: string): string;
declare function sanitizeHost(host: string, remoteScheme: string): string;
declare function peertubeTruncate(str: string, options: {
    length: number;
    separator?: RegExp;
    omission?: string;
}): string;
declare function pageToStartAndCount(page: number, itemsPerPage: number): {
    start: number;
    count: number;
};
type SemVersion = {
    major: number;
    minor: number;
    patch: number;
};
declare function parseSemVersion(s: string): SemVersion;
declare function execShell(command: string, options?: ExecOptions): Promise<{
    err?: Error;
    stdout: string;
    stderr: string;
}>;
declare function generateRSAKeyPairPromise(size: number): Promise<{
    publicKey: string;
    privateKey: string;
}>;
declare function generateED25519KeyPairPromise(): Promise<{
    publicKey: string;
    privateKey: string;
}>;
declare const randomBytesPromise: (arg: number) => Promise<Buffer>;
declare const scryptPromise: (arg1: string, arg2: string, arg3: number) => Promise<Buffer>;
declare const execPromise2: (arg1: string, arg2: any) => Promise<string>;
declare const execPromise: (arg: string) => Promise<string>;
declare const pipelinePromise: typeof pipeline.__promisify__;
export { objectConverter, mapToJSON, sanitizeUrl, sanitizeHost, execShell, pageToStartAndCount, peertubeTruncate, scryptPromise, randomBytesPromise, generateRSAKeyPairPromise, generateED25519KeyPairPromise, execPromise2, execPromise, pipelinePromise, parseSemVersion };
//# sourceMappingURL=core-utils.d.ts.map