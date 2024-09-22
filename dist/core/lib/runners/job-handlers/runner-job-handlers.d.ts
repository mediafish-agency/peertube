import { RunnerJobSuccessPayload, RunnerJobUpdatePayload } from '@peertube/peertube-models';
import { MRunnerJob } from '../../../types/models/runners/index.js';
import { AbstractJobHandler } from './abstract-job-handler.js';
export declare function getRunnerJobHandlerClass(job: MRunnerJob): new () => AbstractJobHandler<unknown, RunnerJobUpdatePayload, RunnerJobSuccessPayload>;
//# sourceMappingURL=runner-job-handlers.d.ts.map