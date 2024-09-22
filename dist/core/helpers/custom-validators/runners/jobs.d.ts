import { RunnerJobSuccessPayload, RunnerJobType, RunnerJobUpdatePayload } from '@peertube/peertube-models';
import { UploadFilesForCheck } from 'express';
export declare function isRunnerJobTypeValid(value: RunnerJobType): boolean;
export declare function isRunnerJobSuccessPayloadValid(value: RunnerJobSuccessPayload, type: RunnerJobType, files: UploadFilesForCheck): boolean;
export declare function isRunnerJobProgressValid(value: string): boolean;
export declare function isRunnerJobUpdatePayloadValid(value: RunnerJobUpdatePayload, type: RunnerJobType, files: UploadFilesForCheck): boolean;
export declare function isRunnerJobTokenValid(value: string): boolean;
export declare function isRunnerJobAbortReasonValid(value: string): boolean;
export declare function isRunnerJobErrorMessageValid(value: string): boolean;
export declare function isRunnerJobStateValid(value: any): boolean;
export declare function isRunnerJobArrayOfStateValid(value: any): boolean;
//# sourceMappingURL=jobs.d.ts.map