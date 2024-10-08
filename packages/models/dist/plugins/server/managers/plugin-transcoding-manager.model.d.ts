import { EncoderOptionsBuilder } from '../../../videos/transcoding/index.js';
export interface PluginTranscodingManager {
    addLiveProfile(encoder: string, profile: string, builder: EncoderOptionsBuilder): boolean;
    addVODProfile(encoder: string, profile: string, builder: EncoderOptionsBuilder): boolean;
    addLiveEncoderPriority(streamType: 'audio' | 'video', encoder: string, priority: number): void;
    addVODEncoderPriority(streamType: 'audio' | 'video', encoder: string, priority: number): void;
    removeAllProfilesAndEncoderPriorities(): void;
}
//# sourceMappingURL=plugin-transcoding-manager.model.d.ts.map