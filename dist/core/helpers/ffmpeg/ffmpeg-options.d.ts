import { FFmpegCommandWrapperOptions } from '@peertube/peertube-ffmpeg';
import { AvailableEncoders } from '@peertube/peertube-models';
type CommandType = 'live' | 'vod' | 'thumbnail';
export declare function getFFmpegCommandWrapperOptions(type: CommandType, availableEncoders?: AvailableEncoders): FFmpegCommandWrapperOptions;
export {};
//# sourceMappingURL=ffmpeg-options.d.ts.map