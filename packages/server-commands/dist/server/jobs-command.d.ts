import { Job, JobState, JobType, ResultList } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class JobsCommand extends AbstractCommand {
    getLatest(options: OverrideCommandOptions & {
        jobType: JobType;
    }): Promise<Job>;
    pauseJobQueue(options?: OverrideCommandOptions): import("supertest").Test;
    resumeJobQueue(options?: OverrideCommandOptions): import("supertest").Test;
    list(options?: OverrideCommandOptions & {
        state?: JobState;
        jobType?: JobType;
        start?: number;
        count?: number;
        sort?: string;
    }): Promise<ResultList<Job>>;
    listFailed(options: OverrideCommandOptions & {
        jobType?: JobType;
    }): Promise<ResultList<Job>>;
    private buildJobsUrl;
}
//# sourceMappingURL=jobs-command.d.ts.map