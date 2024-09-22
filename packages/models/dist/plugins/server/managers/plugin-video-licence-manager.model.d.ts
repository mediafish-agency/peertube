import { ConstantManager } from '../plugin-constant-manager.model.js';
export interface PluginVideoLicenceManager extends ConstantManager<number> {
    addLicence: (licenceKey: number, licenceLabel: string) => boolean;
    deleteLicence: (licenceKey: number) => boolean;
}
//# sourceMappingURL=plugin-video-licence-manager.model.d.ts.map