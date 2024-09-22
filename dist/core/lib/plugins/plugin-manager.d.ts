import express from 'express';
import { Server } from 'http';
import { ClientScriptJSON, PluginTranslation, PluginType_Type, ServerHook, ServerHookName } from '@peertube/peertube-models';
import { MOAuthTokenUser, MUser } from '../../types/models/index.js';
import { PluginModel } from '../../models/server/plugin.js';
import { RegisterServerAuthExternalOptions, RegisterServerAuthPassOptions } from '../../types/plugins/index.js';
import { RegisterHelpers } from './register-helpers.js';
export interface RegisteredPlugin {
    npmName: string;
    name: string;
    version: string;
    description: string;
    peertubeEngine: string;
    type: PluginType_Type;
    path: string;
    staticDirs: {
        [name: string]: string;
    };
    clientScripts: {
        [name: string]: ClientScriptJSON;
    };
    css: string[];
    registerHelpers?: RegisterHelpers;
    unregister?: Function;
}
export interface HookInformationValue {
    npmName: string;
    pluginName: string;
    handler: Function;
    priority: number;
}
export declare class PluginManager implements ServerHook {
    private static instance;
    private registeredPlugins;
    private hooks;
    private translations;
    private server;
    private constructor();
    init(server: Server): void;
    registerWebSocketRouter(): void;
    isRegistered(npmName: string): boolean;
    getRegisteredPluginOrTheme(npmName: string): RegisteredPlugin;
    getRegisteredPluginByShortName(name: string): RegisteredPlugin;
    getRegisteredThemeByShortName(name: string): RegisteredPlugin;
    getRegisteredPlugins(): RegisteredPlugin[];
    getRegisteredThemes(): RegisteredPlugin[];
    getIdAndPassAuths(): {
        npmName: string;
        name: string;
        version: string;
        idAndPassAuths: RegisterServerAuthPassOptions[];
    }[];
    getExternalAuths(): {
        npmName: string;
        name: string;
        version: string;
        externalAuths: RegisterServerAuthExternalOptions[];
    }[];
    getRegisteredSettings(npmName: string): import("@peertube/peertube-models").RegisterServerSettingOptions[];
    getRouter(npmName: string): express.Router;
    getTranslations(locale: string): PluginTranslation;
    isTokenValid(token: MOAuthTokenUser, type: 'access' | 'refresh'): Promise<boolean>;
    onLogout(npmName: string, authName: string, user: MUser, req: express.Request): Promise<string>;
    onSettingsChanged(name: string, settings: any): Promise<void>;
    runHook<T>(hookName: ServerHookName, result?: T, params?: any): Promise<T>;
    registerPluginsAndThemes(): Promise<void>;
    unregister(npmName: string): Promise<void>;
    install(options: {
        toInstall: string;
        version?: string;
        fromDisk?: boolean;
        register?: boolean;
    }): Promise<PluginModel>;
    update(toUpdate: string, fromDisk?: boolean): Promise<PluginModel>;
    uninstall(options: {
        npmName: string;
        unregister?: boolean;
    }): Promise<void>;
    rebuildNativePluginsIfNeeded(): Promise<void>;
    private registerPluginOrTheme;
    private registerPlugin;
    private addTranslations;
    private deleteTranslations;
    private resetCSSGlobalFile;
    private addCSSToGlobalFile;
    private concatFiles;
    private regeneratePluginGlobalCSS;
    private sortHooksByPriority;
    private getPackageJSON;
    private getPluginPath;
    private getAuth;
    private getRegisteredPluginsOrThemes;
    private getRegisterHelpers;
    private sanitizeAndCheckPackageJSONOrThrow;
    static get Instance(): PluginManager;
}
//# sourceMappingURL=plugin-manager.d.ts.map