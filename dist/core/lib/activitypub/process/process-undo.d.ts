import { ActivityUndo, ActivityUndoObject } from '@peertube/peertube-models';
import { APProcessorOptions } from '../../../types/activitypub-processor.model.js';
declare function processUndoActivity(options: APProcessorOptions<ActivityUndo<ActivityUndoObject>>): Promise<any>;
export { processUndoActivity };
//# sourceMappingURL=process-undo.d.ts.map