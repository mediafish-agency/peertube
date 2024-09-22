import { About, ActorImageType_Type, CustomConfig, ServerConfig } from '@peertube/peertube-models';
import { DeepPartial } from '@peertube/peertube-typescript-utils';
import { AbstractCommand, OverrideCommandOptions } from '../shared/abstract-command.js';
export declare class ConfigCommand extends AbstractCommand {
    static getConfigResolutions(enabled: boolean, with0p?: boolean): {
        '0p': boolean;
        '144p': boolean;
        '240p': boolean;
        '360p': boolean;
        '480p': boolean;
        '720p': boolean;
        '1080p': boolean;
        '1440p': boolean;
        '2160p': boolean;
    };
    static getCustomConfigResolutions(enabled: number[]): {
        '0p': boolean;
        '144p': boolean;
        '240p': boolean;
        '360p': boolean;
        '480p': boolean;
        '720p': boolean;
        '1080p': boolean;
        '1440p': boolean;
        '2160p': boolean;
    };
    static getEmailOverrideConfig(emailPort: number): {
        smtp: {
            hostname: string;
            port: number;
        };
    };
    static getDisableRatesLimitOverrideConfig(): {
        rates_limit: {
            api: {
                max: number;
            };
        };
    };
    enableSignup(requiresApproval: boolean, limit?: number): Promise<import("superagent/lib/node/response.js")>;
    disableVideoImports(): Promise<import("superagent/lib/node/response.js")>;
    enableVideoImports(): Promise<import("superagent/lib/node/response.js")>;
    private setVideoImportsEnabled;
    disableFileUpdate(): Promise<import("superagent/lib/node/response.js")>;
    enableFileUpdate(): Promise<import("superagent/lib/node/response.js")>;
    private setFileUpdateEnabled;
    keepSourceFile(): Promise<import("superagent/lib/node/response.js")>;
    enableChannelSync(): Promise<import("superagent/lib/node/response.js")>;
    disableChannelSync(): Promise<import("superagent/lib/node/response.js")>;
    private setChannelSyncEnabled;
    enableAutoBlacklist(): Promise<import("superagent/lib/node/response.js")>;
    disableAutoBlacklist(): Promise<import("superagent/lib/node/response.js")>;
    private setAutoblacklistEnabled;
    enableUserImport(): Promise<import("superagent/lib/node/response.js")>;
    disableUserImport(): Promise<import("superagent/lib/node/response.js")>;
    private setUserImportEnabled;
    enableUserExport(): Promise<import("superagent/lib/node/response.js")>;
    disableUserExport(): Promise<import("superagent/lib/node/response.js")>;
    private setUserExportEnabled;
    enableLive(options?: {
        allowReplay?: boolean;
        resolutions?: 'min' | 'max' | number[];
        transcoding?: boolean;
        maxDuration?: number;
        alwaysTranscodeOriginalResolution?: boolean;
    }): Promise<import("superagent/lib/node/response.js")>;
    disableTranscoding(): Promise<import("superagent/lib/node/response.js")>;
    enableTranscoding(options?: {
        webVideo?: boolean;
        hls?: boolean;
        keepOriginal?: boolean;
        splitAudioAndVideo?: boolean;
        resolutions?: 'min' | 'max' | number[];
        with0p?: boolean;
        alwaysTranscodeOriginalResolution?: boolean;
        maxFPS?: number;
    }): Promise<import("superagent/lib/node/response.js")>;
    setTranscodingConcurrency(concurrency: number): Promise<import("superagent/lib/node/response.js")>;
    enableMinimumTranscoding(options?: {
        webVideo?: boolean;
        hls?: boolean;
        splitAudioAndVideo?: boolean;
        keepOriginal?: boolean;
    }): Promise<import("superagent/lib/node/response.js")>;
    enableRemoteTranscoding(): Promise<import("superagent/lib/node/response.js")>;
    enableRemoteStudio(): Promise<import("superagent/lib/node/response.js")>;
    enableStudio(): Promise<import("superagent/lib/node/response.js")>;
    enableTranscription({ remote }?: {
        remote?: boolean;
    }): Promise<import("superagent/lib/node/response.js")>;
    disableTranscription(): Promise<import("superagent/lib/node/response.js")>;
    private setTranscriptionEnabled;
    getConfig(options?: OverrideCommandOptions): Promise<ServerConfig>;
    getIndexHTMLConfig(options?: OverrideCommandOptions): Promise<ServerConfig>;
    getAbout(options?: OverrideCommandOptions): Promise<About>;
    updateInstanceImage(options: OverrideCommandOptions & {
        fixture: string;
        type: ActorImageType_Type;
    }): import("supertest").SuperTestStatic.Test;
    deleteInstanceImage(options: OverrideCommandOptions & {
        type: ActorImageType_Type;
    }): import("supertest").Test;
    getCustomConfig(options?: OverrideCommandOptions): Promise<CustomConfig>;
    updateCustomConfig(options: OverrideCommandOptions & {
        newCustomConfig: CustomConfig;
    }): import("supertest").Test;
    deleteCustomConfig(options?: OverrideCommandOptions): import("supertest").Test;
    updateExistingConfig(options: OverrideCommandOptions & {
        newConfig: DeepPartial<CustomConfig>;
    }): Promise<import("superagent/lib/node/response.js")>;
}
//# sourceMappingURL=config-command.d.ts.map