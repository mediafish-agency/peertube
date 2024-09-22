declare class LiveQuotaStore {
    private static instance;
    private readonly livesPerUser;
    private constructor();
    addNewLive(userId: number, sessionId: string): void;
    removeLive(userId: number, sessionId: string): void;
    addQuotaTo(userId: number, sessionId: string, size: number): void;
    getLiveQuotaOfUser(userId: number): number;
    static get Instance(): LiveQuotaStore;
}
export { LiveQuotaStore };
//# sourceMappingURL=live-quota-store.d.ts.map