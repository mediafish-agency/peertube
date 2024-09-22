import { HttpStatusCodeType, PeerTubePlugin, PeerTubePluginIndex, PluginPackageJSON, PluginTranslation, PluginType_Type, PublicServerSetting, RegisteredServerSettings, ResultList } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class PluginsCommand extends AbstractCommand {
    static getPluginTestPath(suffix?: string): string;
    list(options: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        pluginType?: PluginType_Type;
        uninstalled?: boolean;
    }): Promise<ResultList<PeerTubePlugin>>;
    listAvailable(options: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        pluginType?: PluginType_Type;
        currentPeerTubeEngine?: string;
        search?: string;
        expectedStatus?: HttpStatusCodeType;
    }): Promise<ResultList<PeerTubePluginIndex>>;
    get(options: OverrideCommandOptions & {
        npmName: string;
    }): Promise<PeerTubePlugin>;
    updateSettings(options: OverrideCommandOptions & {
        npmName: string;
        settings: any;
    }): import("supertest").Test;
    getRegisteredSettings(options: OverrideCommandOptions & {
        npmName: string;
    }): Promise<RegisteredServerSettings>;
    getPublicSettings(options: OverrideCommandOptions & {
        npmName: string;
    }): Promise<PublicServerSetting>;
    getTranslations(options: OverrideCommandOptions & {
        locale: string;
    }): Promise<PluginTranslation>;
    install(options: OverrideCommandOptions & {
        path?: string;
        npmName?: string;
        pluginVersion?: string;
    }): import("supertest").Test;
    update(options: OverrideCommandOptions & {
        path?: string;
        npmName?: string;
    }): import("supertest").Test;
    uninstall(options: OverrideCommandOptions & {
        npmName: string;
    }): import("supertest").Test;
    getCSS(options?: OverrideCommandOptions): Promise<string>;
    getExternalAuth(options: OverrideCommandOptions & {
        npmName: string;
        npmVersion: string;
        authName: string;
        query?: any;
    }): import("supertest").Test;
    updatePackageJSON(npmName: string, json: any): Promise<void>;
    getPackageJSON(npmName: string): Promise<PluginPackageJSON>;
    private getPackageJSONPath;
}
//# sourceMappingURL=plugins-command.d.ts.map