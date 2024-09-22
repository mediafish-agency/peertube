import { RunnerJobModel } from '../../../models/runner/runner-job.js';
import { PickWith } from '@peertube/peertube-typescript-utils';
import { MRunner } from './runner.js';
type Use<K extends keyof RunnerJobModel, M> = PickWith<RunnerJobModel, K, M>;
export type MRunnerJob = Omit<RunnerJobModel, 'Runner' | 'DependsOnRunnerJob'>;
export type MRunnerJobRunner = MRunnerJob & Use<'Runner', MRunner>;
export type MRunnerJobRunnerParent = MRunnerJob & Use<'Runner', MRunner> & Use<'DependsOnRunnerJob', MRunnerJob>;
export {};
//# sourceMappingURL=runner-job.d.ts.map