import { VideoStudioTask } from '@peertube/peertube-models';
declare function isValidStudioTasksArray(tasks: any): boolean;
declare function isStudioCutTaskValid(task: VideoStudioTask): boolean;
declare function isStudioTaskAddIntroOutroValid(task: VideoStudioTask, indice: number, files: Express.Multer.File[]): boolean;
declare function isStudioTaskAddWatermarkValid(task: VideoStudioTask, indice: number, files: Express.Multer.File[]): boolean;
export { isValidStudioTasksArray, isStudioCutTaskValid, isStudioTaskAddIntroOutroValid, isStudioTaskAddWatermarkValid };
//# sourceMappingURL=video-studio.d.ts.map