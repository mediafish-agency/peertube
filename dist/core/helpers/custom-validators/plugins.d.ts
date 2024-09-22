import { PluginPackageJSON, PluginType_Type } from '@peertube/peertube-models';
declare function isPluginTypeValid(value: any): boolean;
declare function isPluginNameValid(value: string): boolean;
declare function isNpmPluginNameValid(value: string): boolean;
declare function isPluginDescriptionValid(value: string): boolean;
declare function isPluginStableVersionValid(value: string): boolean;
declare function isPluginStableOrUnstableVersionValid(value: string): boolean;
declare function isPluginHomepage(value: string): boolean;
declare function isThemeNameValid(name: string): boolean;
declare function isPackageJSONValid(packageJSON: PluginPackageJSON, pluginType: PluginType_Type): {
    result: boolean;
    badFields: string[];
};
declare function isLibraryCodeValid(library: any): boolean;
export { isPluginTypeValid, isPackageJSONValid, isThemeNameValid, isPluginHomepage, isPluginStableVersionValid, isPluginStableOrUnstableVersionValid, isPluginNameValid, isPluginDescriptionValid, isLibraryCodeValid, isNpmPluginNameValid };
//# sourceMappingURL=plugins.d.ts.map