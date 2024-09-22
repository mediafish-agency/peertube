import { Video } from '../video.model.js';
export declare const VideoPlaylistElementType: {
    readonly REGULAR: 0;
    readonly DELETED: 1;
    readonly PRIVATE: 2;
    readonly UNAVAILABLE: 3;
};
export type VideoPlaylistElementType_Type = typeof VideoPlaylistElementType[keyof typeof VideoPlaylistElementType];
export interface VideoPlaylistElement {
    id: number;
    position: number;
    startTimestamp: number;
    stopTimestamp: number;
    type: VideoPlaylistElementType_Type;
    video?: Video;
}
//# sourceMappingURL=video-playlist-element.model.d.ts.map