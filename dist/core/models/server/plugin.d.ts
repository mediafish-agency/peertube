import { PeerTubePlugin, RegisterServerSettingOptions, SettingEntries, SettingValue, type PluginType_Type } from '@peertube/peertube-models';
import { MPlugin, MPluginFormattable } from '../../types/models/index.js';
import { SequelizeModel } from '../shared/index.js';
export declare class PluginModel extends SequelizeModel<PluginModel> {
    name: string;
    type: PluginType_Type;
    version: string;
    latestVersion: string;
    enabled: boolean;
    uninstalled: boolean;
    peertubeEngine: string;
    description: string;
    homepage: string;
    settings: any;
    storage: any;
    createdAt: Date;
    updatedAt: Date;
    static listEnabledPluginsAndThemes(): Promise<MPlugin[]>;
    static loadByNpmName(npmName: string): Promise<MPlugin>;
    static getSetting(pluginName: string, pluginType: PluginType_Type, settingName: string, registeredSettings: RegisterServerSettingOptions[]): Promise<any>;
    static getSettings(pluginName: string, pluginType: PluginType_Type, settingNames: string[], registeredSettings: RegisterServerSettingOptions[]): Promise<SettingEntries>;
    static setSetting(pluginName: string, pluginType: PluginType_Type, settingName: string, settingValue: SettingValue): Promise<any>;
    static getData(pluginName: string, pluginType: PluginType_Type, key: string): Promise<any>;
    static storeData(pluginName: string, pluginType: PluginType_Type, key: string, data: any): Promise<any>;
    static listForApi(options: {
        pluginType?: PluginType_Type;
        uninstalled?: boolean;
        start: number;
        count: number;
        sort: string;
    }): Promise<{
        total: number;
        data: PluginModel[];
    }>;
    static listInstalled(): Promise<MPlugin[]>;
    static normalizePluginName(npmName: string): string;
    static getTypeFromNpmName(npmName: string): 1 | 2;
    static buildNpmName(name: string, type: PluginType_Type): string;
    getPublicSettings(registeredSettings: RegisterServerSettingOptions[]): SettingEntries;
    toFormattedJSON(this: MPluginFormattable): PeerTubePlugin;
}
//# sourceMappingURL=plugin.d.ts.map