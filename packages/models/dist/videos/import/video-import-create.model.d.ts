import { VideoUpdate } from '../video-update.model.js';
export interface VideoImportCreate extends VideoUpdate {
    targetUrl?: string;
    magnetUri?: string;
    torrentfile?: Blob;
    generateTranscription?: boolean;
    channelId: number;
}
//# sourceMappingURL=video-import-create.model.d.ts.map