export declare const RunnerJobState: {
    readonly PENDING: 1;
    readonly PROCESSING: 2;
    readonly COMPLETED: 3;
    readonly ERRORED: 4;
    readonly WAITING_FOR_PARENT_JOB: 5;
    readonly CANCELLED: 6;
    readonly PARENT_ERRORED: 7;
    readonly PARENT_CANCELLED: 8;
    readonly COMPLETING: 9;
};
export type RunnerJobStateType = typeof RunnerJobState[keyof typeof RunnerJobState];
//# sourceMappingURL=runner-job-state.model.d.ts.map