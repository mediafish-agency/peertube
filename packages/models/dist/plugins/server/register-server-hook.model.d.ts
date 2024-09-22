import { ServerHookName } from './server-hook.model.js';
export interface RegisterServerHookOptions {
    target: ServerHookName;
    handler: Function;
    priority?: number;
}
//# sourceMappingURL=register-server-hook.model.d.ts.map