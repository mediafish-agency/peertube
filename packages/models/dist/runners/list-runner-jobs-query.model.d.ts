import { RunnerJobStateType } from './runner-job-state.model.js';
export interface ListRunnerJobsQuery {
    start?: number;
    count?: number;
    sort?: string;
    search?: string;
    stateOneOf?: RunnerJobStateType[];
}
//# sourceMappingURL=list-runner-jobs-query.model.d.ts.map