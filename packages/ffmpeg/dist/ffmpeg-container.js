import { FFmpegCommandWrapper } from './ffmpeg-command-wrapper.js';
export class FFmpegContainer {
    constructor(options) {
        this.commandWrapper = new FFmpegCommandWrapper(options);
    }
    mergeInputs(options) {
        const { inputs, output, logError, coverPath } = options;
        this.commandWrapper.buildCommand(inputs)
            .outputOption('-c copy')
            .outputOption('-movflags frag_keyframe+empty_moov')
            .format('mp4')
            .output(output);
        if (coverPath) {
            this.commandWrapper.getCommand()
                .addInput(coverPath);
        }
        return this.commandWrapper.runCommand({ silent: !logError });
    }
}
//# sourceMappingURL=ffmpeg-container.js.map