import { VideoImportPreventExceptionResult } from '@peertube/peertube-models';
import { Job } from 'bullmq';
declare function processVideoImport(job: Job): Promise<VideoImportPreventExceptionResult>;
export { processVideoImport };
//# sourceMappingURL=video-import.d.ts.map