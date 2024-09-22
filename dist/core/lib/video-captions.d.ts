import { MVideo, MVideoCaption, MVideoFullLight, MVideoUUID, MVideoUrl } from '../types/models/index.js';
export declare function createLocalCaption(options: {
    video: MVideo;
    path: string;
    language: string;
    automaticallyGenerated: boolean;
}): Promise<MVideoCaption & {
    Video: MVideo;
}>;
export declare function createTranscriptionTaskIfNeeded(video: MVideoUUID & MVideoUrl): Promise<void>;
export declare function generateSubtitle(options: {
    video: MVideoUUID;
}): Promise<any>;
export declare function onTranscriptionEnded(options: {
    video: MVideoFullLight;
    language: string;
    vttPath: string;
    lTags?: (string | number)[];
}): Promise<void>;
//# sourceMappingURL=video-captions.d.ts.map