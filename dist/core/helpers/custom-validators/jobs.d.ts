import { JobState } from '@peertube/peertube-models';
declare const jobStates: Set<JobState>;
declare function isValidJobState(value: JobState): boolean;
declare function isValidJobType(value: any): boolean;
export { jobStates, isValidJobState, isValidJobType };
//# sourceMappingURL=jobs.d.ts.map