import { MStreamingPlaylist, MVideo, MVideoFile, MVideoUUID } from '../types/models/index.js';
declare function generateHLSRedundancyUrl(video: MVideo, playlist: MStreamingPlaylist): string;
declare function generateWebVideoRedundancyUrl(file: MVideoFile): string;
declare function getLocalVideoFileMetadataUrl(video: MVideoUUID, videoFile: MVideoFile): string;
export { getLocalVideoFileMetadataUrl, generateWebVideoRedundancyUrl, generateHLSRedundancyUrl };
//# sourceMappingURL=video-urls.d.ts.map