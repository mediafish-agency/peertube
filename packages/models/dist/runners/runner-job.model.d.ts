import { VideoConstant } from '../videos/index.js';
import { RunnerJobPayload } from './runner-job-payload.model.js';
import { RunnerJobPrivatePayload } from './runner-job-private-payload.model.js';
import { RunnerJobStateType } from './runner-job-state.model.js';
import { RunnerJobType } from './runner-job-type.type.js';
export interface RunnerJob<T extends RunnerJobPayload = RunnerJobPayload> {
    uuid: string;
    type: RunnerJobType;
    state: VideoConstant<RunnerJobStateType>;
    payload: T;
    failures: number;
    error: string | null;
    progress: number;
    priority: number;
    startedAt: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
    finishedAt: Date | string;
    parent?: {
        type: RunnerJobType;
        state: VideoConstant<RunnerJobStateType>;
        uuid: string;
    };
    runner?: {
        id: number;
        name: string;
        description: string;
    };
}
export interface RunnerJobAdmin<T extends RunnerJobPayload = RunnerJobPayload, U extends RunnerJobPrivatePayload = RunnerJobPrivatePayload> extends RunnerJob<T> {
    privatePayload: U;
}
//# sourceMappingURL=runner-job.model.d.ts.map