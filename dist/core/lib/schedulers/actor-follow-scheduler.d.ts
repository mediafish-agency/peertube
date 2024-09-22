import { AbstractScheduler } from './abstract-scheduler.js';
export declare class ActorFollowScheduler extends AbstractScheduler {
    private static instance;
    protected schedulerIntervalMs: number;
    private constructor();
    protected internalExecute(): Promise<void>;
    private processPendingScores;
    private removeBadActorFollows;
    static get Instance(): AbstractScheduler;
}
//# sourceMappingURL=actor-follow-scheduler.d.ts.map