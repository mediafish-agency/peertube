import { ActivityCreate, ActivityCreateObject } from '@peertube/peertube-models';
import { APProcessorOptions } from '../../../types/activitypub-processor.model.js';
declare function processCreateActivity(options: APProcessorOptions<ActivityCreate<ActivityCreateObject>>): Promise<any>;
export { processCreateActivity };
//# sourceMappingURL=process-create.d.ts.map