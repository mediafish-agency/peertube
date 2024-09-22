import express from 'express';
import { ValidationChain } from 'express-validator';
import { PluginType_Type } from '@peertube/peertube-models';
declare const getPluginValidator: (pluginType: PluginType_Type, withVersion?: boolean) => (ValidationChain | express.Handler)[];
declare const getExternalAuthValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const pluginStaticDirectoryValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const listPluginsValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const installOrUpdatePluginValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const uninstallPluginValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const existingPluginValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
declare const updatePluginSettingsValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
declare const listAvailablePluginsValidator: (ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export { pluginStaticDirectoryValidator, getPluginValidator, updatePluginSettingsValidator, uninstallPluginValidator, listAvailablePluginsValidator, existingPluginValidator, installOrUpdatePluginValidator, listPluginsValidator, getExternalAuthValidator };
//# sourceMappingURL=plugins.d.ts.map