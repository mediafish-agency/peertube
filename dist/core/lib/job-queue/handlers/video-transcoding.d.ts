import { MVideoFullLight } from '../../../types/models/index.js';
import { Job } from 'bullmq';
declare function processVideoTranscoding(job: Job): Promise<MVideoFullLight>;
export { processVideoTranscoding };
//# sourceMappingURL=video-transcoding.d.ts.map