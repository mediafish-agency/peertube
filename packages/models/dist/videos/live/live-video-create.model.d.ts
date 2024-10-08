import { VideoCreate } from '../video-create.model.js';
import { VideoPrivacyType } from '../video-privacy.enum.js';
import { LiveVideoLatencyModeType } from './live-video-latency-mode.enum.js';
export interface LiveVideoCreate extends VideoCreate {
    permanentLive?: boolean;
    latencyMode?: LiveVideoLatencyModeType;
    saveReplay?: boolean;
    replaySettings?: {
        privacy: VideoPrivacyType;
    };
}
//# sourceMappingURL=live-video-create.model.d.ts.map