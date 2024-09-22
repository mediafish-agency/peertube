import { ConstantManager } from '../plugin-constant-manager.model.js';
export interface PluginVideoLanguageManager extends ConstantManager<string> {
    addLanguage: (languageKey: string, languageLabel: string) => boolean;
    deleteLanguage: (languageKey: string) => boolean;
}
//# sourceMappingURL=plugin-video-language-manager.model.d.ts.map