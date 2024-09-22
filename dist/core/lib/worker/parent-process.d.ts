import type httpBroadcast from './workers/http-broadcast.js';
import type downloadImage from './workers/image-downloader.js';
import type processImage from './workers/image-processor.js';
import type getImageSize from './workers/get-image-size.js';
import type signJsonLDObject from './workers/sign-json-ld-object.js';
import type buildDigest from './workers/build-digest.js';
import type httpUnicast from './workers/http-unicast.js';
export declare function downloadImageFromWorker(options: Parameters<typeof downloadImage>[0]): Promise<ReturnType<typeof downloadImage>>;
export declare function processImageFromWorker(options: Parameters<typeof processImage>[0]): Promise<ReturnType<typeof processImage>>;
export declare function getImageSizeFromWorker(options: Parameters<typeof getImageSize>[0]): Promise<ReturnType<typeof getImageSize>>;
export declare function parallelHTTPBroadcastFromWorker(options: Parameters<typeof httpBroadcast>[0]): Promise<ReturnType<typeof httpBroadcast>>;
export declare function sequentialHTTPBroadcastFromWorker(options: Parameters<typeof httpBroadcast>[0]): Promise<ReturnType<typeof httpBroadcast>>;
export declare function httpUnicastFromWorker(options: Parameters<typeof httpUnicast>[0]): Promise<ReturnType<typeof httpUnicast>>;
export declare function signJsonLDObjectFromWorker<T>(options: Parameters<typeof signJsonLDObject<T>>[0]): ReturnType<typeof signJsonLDObject<T>>;
export declare function buildDigestFromWorker(options: Parameters<typeof buildDigest>[0]): Promise<ReturnType<typeof buildDigest>>;
export declare function getWorkersStats(): {
    label: string;
    queueSize: number;
    completed: number;
}[];
//# sourceMappingURL=parent-process.d.ts.map