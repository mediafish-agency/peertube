import { RegisterClientFormFieldOptions } from '../../client/index.js';
export type RegisterServerSettingOptions = RegisterClientFormFieldOptions & {
    private: boolean;
};
export interface RegisteredServerSettings {
    registeredSettings: RegisterServerSettingOptions[];
}
//# sourceMappingURL=register-server-setting.model.d.ts.map