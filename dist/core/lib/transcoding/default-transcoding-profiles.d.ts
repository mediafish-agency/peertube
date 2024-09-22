import { AvailableEncoders, EncoderOptionsBuilder } from '@peertube/peertube-models';
declare class VideoTranscodingProfilesManager {
    private static instance;
    private readonly encodersPriorities;
    private readonly availableEncoders;
    private availableProfiles;
    private constructor();
    getAvailableEncoders(): AvailableEncoders;
    getAvailableProfiles(type: 'vod' | 'live'): string[];
    addProfile(options: {
        type: 'vod' | 'live';
        encoder: string;
        profile: string;
        builder: EncoderOptionsBuilder;
    }): void;
    removeProfile(options: {
        type: 'vod' | 'live';
        encoder: string;
        profile: string;
    }): void;
    addEncoderPriority(type: 'vod' | 'live', streamType: 'audio' | 'video', encoder: string, priority: number): void;
    removeEncoderPriority(type: 'vod' | 'live', streamType: 'audio' | 'video', encoder: string, priority: number): void;
    private getEncodersByPriority;
    private buildAvailableProfiles;
    private buildDefaultEncodersPriorities;
    static get Instance(): VideoTranscodingProfilesManager;
}
export { VideoTranscodingProfilesManager };
//# sourceMappingURL=default-transcoding-profiles.d.ts.map