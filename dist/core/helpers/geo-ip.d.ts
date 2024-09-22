export declare class GeoIP {
    private static instance;
    private countryReader;
    private cityReader;
    private readonly INIT_READERS_RETRY_INTERVAL;
    private readonly countryDBPath;
    private readonly cityDBPath;
    private constructor();
    safeIPISOLookup(ip: string): Promise<{
        country: string;
        subdivisionName: string;
    }>;
    private getISOCountry;
    private getISOSubdivision;
    updateDatabases(): Promise<void>;
    private updateCountryDatabase;
    private updateCityDatabase;
    private updateDatabaseFile;
    private initReadersIfNeeded;
    private readonly initReadersIfNeededThrottle;
    static get Instance(): GeoIP;
}
//# sourceMappingURL=geo-ip.d.ts.map