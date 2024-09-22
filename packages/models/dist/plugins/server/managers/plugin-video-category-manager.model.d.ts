import { ConstantManager } from '../plugin-constant-manager.model.js';
export interface PluginVideoCategoryManager extends ConstantManager<number> {
    addCategory: (categoryKey: number, categoryLabel: string) => boolean;
    deleteCategory: (categoryKey: number) => boolean;
}
//# sourceMappingURL=plugin-video-category-manager.model.d.ts.map