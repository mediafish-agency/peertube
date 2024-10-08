import { VideoPrivacyType } from '../video-privacy.enum.js';
import { LiveVideoLatencyModeType } from './live-video-latency-mode.enum.js';
export interface LiveVideo {
    rtmpUrl?: string;
    rtmpsUrl?: string;
    streamKey?: string;
    saveReplay: boolean;
    replaySettings?: {
        privacy: VideoPrivacyType;
    };
    permanentLive: boolean;
    latencyMode: LiveVideoLatencyModeType;
}
//# sourceMappingURL=live-video.model.d.ts.map