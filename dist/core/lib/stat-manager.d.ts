import { ActivityType, ServerStats } from '@peertube/peertube-models';
declare class StatsManager {
    private static instance;
    private readonly instanceStartDate;
    private readonly inboxMessages;
    private constructor();
    updateInboxWaiting(inboxMessagesWaiting: number): void;
    addInboxProcessedSuccess(type: ActivityType): void;
    addInboxProcessedError(type: ActivityType): void;
    getStats(): Promise<ServerStats>;
    private buildActivityPubMessagesProcessedPerSecond;
    private buildRedundancyStats;
    private buildAPPerType;
    private buildAPStats;
    private buildRegistrationRequestsStats;
    private buildAbuseStats;
    static get Instance(): StatsManager;
}
export { StatsManager };
//# sourceMappingURL=stat-manager.d.ts.map