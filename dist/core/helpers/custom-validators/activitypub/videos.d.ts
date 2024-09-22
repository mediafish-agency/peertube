import { ActivityTrackerUrlObject, ActivityVideoFileMetadataUrlObject, VideoObject } from '@peertube/peertube-models';
export declare function sanitizeAndCheckVideoTorrentUpdateActivity(activity: any): boolean;
export declare function sanitizeAndCheckVideoTorrentObject(video: VideoObject): boolean;
export declare function isRemoteVideoUrlValid(url: any): boolean;
export declare function isAPVideoFileUrlMetadataObject(url: any): url is ActivityVideoFileMetadataUrlObject;
export declare function isAPVideoTrackerUrlObject(url: any): url is ActivityTrackerUrlObject;
//# sourceMappingURL=videos.d.ts.map