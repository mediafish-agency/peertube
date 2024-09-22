import { MUserAccountUrl } from '../types/models/index.js';
declare class VideoTokensManager {
    private static instance;
    private readonly lruCache;
    private constructor();
    createForAuthUser(options: {
        user: MUserAccountUrl;
        videoUUID: string;
    }): {
        token: import("short-uuid").UUID;
        expires: Date;
    };
    createForPasswordProtectedVideo(options: {
        videoUUID: string;
    }): {
        token: import("short-uuid").UUID;
        expires: Date;
    };
    hasToken(options: {
        token: string;
        videoUUID: string;
    }): boolean;
    getUserFromToken(options: {
        token: string;
    }): MUserAccountUrl;
    static get Instance(): VideoTokensManager;
    private generateVideoToken;
}
export { VideoTokensManager };
//# sourceMappingURL=video-tokens-manager.d.ts.map