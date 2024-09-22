import { HttpStatusCode } from '@peertube/peertube-models';
import { AbstractCommand } from '../shared/index.js';
export class VideoStudioCommand extends AbstractCommand {
    static getComplexTask() {
        return [
            {
                name: 'cut',
                options: {
                    start: 1,
                    end: 3
                }
            },
            {
                name: 'add-outro',
                options: {
                    file: 'video_short.webm'
                }
            },
            {
                name: 'add-watermark',
                options: {
                    file: 'custom-thumbnail.png'
                }
            },
            {
                name: 'add-intro',
                options: {
                    file: 'video_very_short_240p.mp4'
                }
            }
        ];
    }
    createEditionTasks(options) {
        const path = '/api/v1/videos/' + options.videoId + '/studio/edit';
        const attaches = {};
        for (let i = 0; i < options.tasks.length; i++) {
            const task = options.tasks[i];
            if (task.name === 'add-intro' || task.name === 'add-outro' || task.name === 'add-watermark') {
                attaches[`tasks[${i}][options][file]`] = task.options.file;
            }
        }
        return this.postUploadRequest(Object.assign(Object.assign({}, options), { path,
            attaches, fields: { tasks: options.tasks }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
}
//# sourceMappingURL=video-studio-command.js.map