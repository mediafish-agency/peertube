import { FFmpegImage } from '@peertube/peertube-ffmpeg';
import { getFFmpegCommandWrapperOptions } from './ffmpeg-options.js';
export function processGIF(options) {
    return new FFmpegImage(getFFmpegCommandWrapperOptions('thumbnail')).processGIF(options);
}
export function generateThumbnailFromVideo(options) {
    return new FFmpegImage(getFFmpegCommandWrapperOptions('thumbnail')).generateThumbnailFromVideo(options);
}
export function convertWebPToJPG(options) {
    return new FFmpegImage(getFFmpegCommandWrapperOptions('thumbnail')).convertWebPToJPG(options);
}
//# sourceMappingURL=ffmpeg-image.js.map