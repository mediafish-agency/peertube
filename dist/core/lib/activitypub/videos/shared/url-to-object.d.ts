import { VideoObject } from '@peertube/peertube-models';
declare function fetchRemoteVideo(videoUrl: string): Promise<{
    statusCode: number;
    videoObject: VideoObject;
}>;
export { fetchRemoteVideo };
//# sourceMappingURL=url-to-object.d.ts.map