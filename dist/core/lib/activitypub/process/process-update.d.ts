import { ActivityUpdate, ActivityUpdateObject } from '@peertube/peertube-models';
import { APProcessorOptions } from '../../../types/activitypub-processor.model.js';
declare function processUpdateActivity(options: APProcessorOptions<ActivityUpdate<ActivityUpdateObject>>): Promise<any>;
export { processUpdateActivity };
//# sourceMappingURL=process-update.d.ts.map