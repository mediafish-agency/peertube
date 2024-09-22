import { HookType_Type, RegisteredExternalAuthConfig } from '@peertube/peertube-models';
declare function getHookType(hookName: string): 1 | 2 | 3;
declare function internalRunHook<T>(options: {
    handler: Function;
    hookType: HookType_Type;
    result: T;
    params: any;
    onError: (err: Error) => void;
}): Promise<any>;
declare function getExternalAuthHref(apiUrl: string, auth: RegisteredExternalAuthConfig): string;
export { getHookType, internalRunHook, getExternalAuthHref };
//# sourceMappingURL=hooks.d.ts.map