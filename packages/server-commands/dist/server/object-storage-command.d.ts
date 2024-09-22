export declare class ObjectStorageCommand {
    static readonly DEFAULT_SCALEWAY_BUCKET = "peertube-ci-test";
    private readonly bucketsCreated;
    private readonly seed;
    constructor();
    static getMockCredentialsConfig(): {
        access_key_id: string;
        secret_access_key: string;
    };
    static getMockEndpointHost(): string;
    static getMockRegion(): string;
    getDefaultMockConfig(options?: {
        storeLiveStreams?: boolean;
    }): {
        object_storage: {
            enabled: boolean;
            endpoint: string;
            region: string;
            credentials: {
                access_key_id: string;
                secret_access_key: string;
            };
            streaming_playlists: {
                bucket_name: string;
                store_live_streams: boolean;
            };
            web_videos: {
                bucket_name: string;
            };
            user_exports: {
                bucket_name: string;
            };
            original_video_files: {
                bucket_name: string;
            };
        };
    };
    getMockWebVideosBaseUrl(): string;
    getMockPlaylistBaseUrl(): string;
    getMockUserExportBaseUrl(): string;
    getMockOriginalFileBaseUrl(): string;
    prepareDefaultMockBuckets(): Promise<void>;
    createMockBucket(name: string): Promise<void>;
    cleanupMock(): Promise<void>;
    getMockStreamingPlaylistsBucketName(name?: string): string;
    getMockWebVideosBucketName(name?: string): string;
    getMockUserExportBucketName(name?: string): string;
    getMockOriginalFileBucketName(name?: string): string;
    getMockBucketName(name: string): string;
    private deleteMockBucket;
    static getDefaultScalewayConfig(options: {
        serverNumber: number;
        enablePrivateProxy?: boolean;
        privateACL?: 'private' | 'public-read';
    }): {
        object_storage: {
            enabled: boolean;
            endpoint: string;
            region: string;
            credentials: {
                access_key_id: string;
                secret_access_key: string;
            };
            upload_acl: {
                private: "private" | "public-read";
            };
            proxy: {
                proxify_private_files: boolean;
            };
            streaming_playlists: {
                bucket_name: string;
                prefix: string;
            };
            web_videos: {
                bucket_name: string;
                prefix: string;
            };
        };
    };
    static getScalewayCredentialsConfig(): {
        access_key_id: string;
        secret_access_key: string;
    };
    static getScalewayEndpointHost(): string;
    static getScalewayRegion(): string;
    static getScalewayBaseUrl(): string;
}
//# sourceMappingURL=object-storage-command.d.ts.map