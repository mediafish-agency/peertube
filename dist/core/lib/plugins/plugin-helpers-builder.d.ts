import { Server } from 'http';
import { MPlugin } from '../../types/models/index.js';
import { PeerTubeHelpers } from '../../types/plugins/index.js';
declare function buildPluginHelpers(httpServer: Server, pluginModel: MPlugin, npmName: string): PeerTubeHelpers;
export { buildPluginHelpers };
//# sourceMappingURL=plugin-helpers-builder.d.ts.map