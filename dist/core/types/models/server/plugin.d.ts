import { PluginModel } from '../../../models/server/plugin.js';
export type MPlugin = PluginModel;
export type MPluginFormattable = Pick<MPlugin, 'name' | 'type' | 'version' | 'latestVersion' | 'enabled' | 'uninstalled' | 'peertubeEngine' | 'description' | 'homepage' | 'settings' | 'createdAt' | 'updatedAt'>;
//# sourceMappingURL=plugin.d.ts.map